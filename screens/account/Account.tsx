import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import { useLayoutEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import IconButton from "@/components/button/IconButton";
import IconButtonWithTitle from "@/components/button/IconButtonWithTitle";
import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import DayInput from "@/components/input/DayInput";
import TextInput, { InputValueType } from "@/components/input/TextInput";
import SubHeaderText from "@/components/text/SubHeaderText";
import BodyContainer from "@/components/ui/BodyContainer";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import ModalOverlay from "@/components/ui/ModalOverlay";
import Colors from "@/constants/color";
import { InputType } from "@/enum/InputType";
import { useEditProfile } from "@/store/api/user/useEditProfile";
import { useUploadImage } from "@/store/api/user/useUploadImage";
import { useAuth } from "@/store/context/auth";
import { useProfile } from "@/store/context/profile";
import {
  MainPageBottomTabParamList,
  AuthenticatedStackParamList,
} from "@/types";
import { formatISODate } from "@/utils/date";

export type AccountProps = CompositeScreenProps<
  NativeStackScreenProps<MainPageBottomTabParamList, "Account">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

interface ProfileInput {
  firstname: InputValueType;
  lastname: InputValueType;
  email: InputValueType;
  dob: InputValueType;
  mobileNo: InputValueType;
}

const IMAGE_SIZE = 100;

const Account: React.FC<AccountProps> = () => {
  const { accessToken, authenticate } = useAuth();
  const { profile: defaultProfile, setProfile: setDefaultProfile } =
    useProfile();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isUploading, setUploading] = useState<boolean>(false);
  const [profile, setProfile] = useState<ProfileInput>({
    firstname: { value: "" },
    lastname: { value: "" },
    email: { value: "" },
    dob: { value: "" },
    mobileNo: { value: "" },
  });
  const [isEditing, setEditing] = useState<boolean>(false);
  const [showEditImageOption, setEditImageOption] = useState<boolean>(false);
  const { mutateAsync: editProfileAsync } = useEditProfile();
  const { mutateAsync: saveImageAsync } = useUploadImage();

  useLayoutEffect(() => {
    if (defaultProfile) {
      const modProfile: ProfileInput = {
        firstname: { value: defaultProfile.firstname },
        lastname: { value: defaultProfile.lastname },
        email: { value: defaultProfile.email },
        mobileNo: { value: defaultProfile.tel ?? "" },
        dob: { value: formatISODate(defaultProfile.date_of_birth) },
      };
      setProfile(modProfile);
      setLoading(false);
    }
  }, [defaultProfile]);

  const handleOnChangeText = (identifierKey: string, enteredValue: string) => {
    setProfile((curInputValue: ProfileInput) => {
      return {
        ...curInputValue,
        [identifierKey]: { value: enteredValue },
      };
    });
  };

  const onCancel = () => {
    const modProfile: ProfileInput = {
      firstname: { value: defaultProfile.firstname },
      lastname: { value: defaultProfile.lastname },
      email: { value: defaultProfile.email },
      mobileNo: { value: defaultProfile.tel ?? "" },
      dob: { value: formatISODate(defaultProfile.date_of_birth) },
    };
    setProfile(modProfile);
    setEditing(false);
  };

  const onSave = async () => {
    const { firstname, lastname, mobileNo } = profile;
    const isFirstnameValid = firstname.value.length > 0;
    const isLastnameValid = lastname.value.length > 0;
    const isMobileNoValid = /^(06|08|09)\d{8}$/.test(mobileNo.value);

    const isValid = isFirstnameValid && isLastnameValid && isMobileNoValid;
    if (!isValid) {
      setProfile((curInputValue: ProfileInput) => {
        return {
          ...curInputValue,
          firstname: {
            ...curInputValue.firstname,
            errorText: isFirstnameValid
              ? undefined
              : "Firstname should not be empty",
          },
          lastname: {
            ...curInputValue.lastname,
            errorText: isLastnameValid
              ? undefined
              : "Lastname should not be empty",
          },
          mobileNo: {
            ...curInputValue.mobileNo,
            errorText: isMobileNoValid ? undefined : "Invalid mobile number",
          },
        };
      });
    } else {
      try {
        await editProfileAsync(
          {
            body: {
              firstname: profile.firstname.value,
              lastname: profile.lastname.value,
              date_of_birth: profile.dob.value,
              tel: profile.mobileNo.value,
            },
            auth: { accessToken, authenticate },
          },
          {
            onSuccess(data) {
              setDefaultProfile(data);
            },
          }
        );
        setEditing(false);
      } catch (error) {
        Alert.alert(
          "Updating Failed",
          "Please try again!!: " + (error as Error).message
        );
      }
    }
  };

  const saveImage = async (image: ImagePicker.ImagePickerSuccessResult) => {
    const formData = new FormData();
    formData.append(
      "file",
      {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        uri: image.assets[0].uri,
        type: image.assets[0].mimeType ?? "image/jpeg",
        name: `${defaultProfile.email}-${image.assets[0].fileName}.jpg`,
      },
      `${defaultProfile.email}-profile-img.jpg`
    );
    setUploading(true);
    await saveImageAsync(
      {
        body: formData,
        auth: { accessToken, authenticate },
      },
      {
        onSuccess(data) {
          setDefaultProfile(data);
          setEditImageOption(false);
          setUploading(false);
        },
        onError() {
          setUploading(false);
        },
      }
    );
  };

  const uploadImage = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access camera was denied");
        return;
      }
      const image = await ImagePicker.launchCameraAsync();
      if (!image.canceled) {
        await saveImage(image);
      }
    } catch (error) {
      console.error("Error uploading image via camera:", error);
    }
  };

  const uploadImageFromGallery = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access photos gallery was denied");
        return;
      }
      const image = await ImagePicker.launchImageLibraryAsync();
      if (!image.canceled) {
        await saveImage(image);
      }
    } catch (error) {
      console.error("Error uploading image via camaera:", error);
    }
  };

  if (isLoading) return <LoadingOverlay />;

  return (
    <BodyContainer>
      {!isEditing && (
        <View style={styles.headerContainer}>
          <TouchableOpacity>
            <Image
              style={styles.profileImage}
              source={
                defaultProfile.profile_image
                  ? {
                      uri: defaultProfile.profile_image,
                    }
                  : require("../../assets/images/profile-image-placeholder.jpg")
              }
              height={IMAGE_SIZE}
              width={IMAGE_SIZE}
            />
            <IconButton
              icon="camera-outline"
              size={20}
              color={Colors.gray[800]}
              onPress={() => setEditImageOption(true)}
              buttonStyle={styles.editImageButton}
            />
          </TouchableOpacity>
          <IconButton
            icon="cog-outline"
            size={24}
            color={Colors.gray[800]}
            onPress={() => setEditing(true)}
          />
        </View>
      )}
      <View style={styles.rowContainer}>
        <TextInput
          title="Firstname"
          placeholder="John"
          value={profile.firstname.value}
          onChangeText={handleOnChangeText.bind(this, "firstname")}
          containerStyle={styles.infoInput}
          editable={isEditing}
          isRequired={isEditing}
          errorText={profile.firstname.errorText}
        />
        <TextInput
          title="Lastname"
          placeholder="Doe"
          value={profile.lastname.value}
          onChangeText={handleOnChangeText.bind(this, "lastname")}
          containerStyle={styles.infoInput}
          editable={isEditing}
          isRequired={isEditing}
          errorText={profile.lastname.errorText}
        />
      </View>
      <TextInput
        title="Email"
        placeholder="email@napark.com"
        value={profile.email.value}
        onChangeText={handleOnChangeText.bind(this, "email")}
        editable={false}
      />
      <View style={styles.rowContainer}>
        <DayInput
          title="Date of birth"
          date={profile.dob.value}
          onChange={handleOnChangeText.bind(this, "dob")}
          editable={isEditing}
          outerContainerStyle={styles.infoInput}
        />
        <TextInput
          title="Mobile No."
          placeholder="08xxxxxxxx"
          value={profile.mobileNo.value}
          onChangeText={handleOnChangeText.bind(this, "mobileNo")}
          containerStyle={styles.infoInput}
          editable={isEditing}
          isRequired={isEditing}
          errorText={profile.mobileNo.errorText}
          inputMode={InputType.Numeric}
        />
      </View>
      {isEditing && (
        <View style={styles.buttonContainer}>
          <SecondaryButton
            title="Cancel"
            onPress={onCancel}
            outerContainerStyle={styles.button}
          />
          <PrimaryButton
            title="Save"
            onPress={onSave}
            outerContainerStyle={styles.button}
          />
        </View>
      )}
      <View style={{ position: "absolute", width: "100%" }}>
        <SafeAreaView>
          <ModalOverlay
            visible={showEditImageOption}
            closeModal={() => setEditImageOption(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.outerContainer}>
                {isUploading ? (
                  <LoadingOverlay />
                ) : (
                  <>
                    <SubHeaderText text="Edit profile photo" />
                    <View style={styles.imageOptionContainer}>
                      <IconButtonWithTitle
                        title={"Camera"}
                        onPress={uploadImage}
                        icon={"camera-outline"}
                        iconColor={Colors.gray[800]}
                        textStyle={{ fontSize: 12 }}
                      />
                      <IconButtonWithTitle
                        title={"Gallery"}
                        onPress={uploadImageFromGallery}
                        icon={"image-outline"}
                        iconColor={Colors.gray[800]}
                        textStyle={{ fontSize: 12 }}
                      />
                    </View>
                  </>
                )}
              </View>
            </View>
          </ModalOverlay>
        </SafeAreaView>
      </View>
    </BodyContainer>
  );
};

export default Account;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    gap: width / 4 - IMAGE_SIZE / 4 - 6,
    marginBottom: 10,
  },
  profileImage: {
    borderRadius: 50,
    marginHorizontal: 10,
    height: 100,
    width: 100,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  infoInput: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: "20%",
  },
  button: {
    flex: 1,
  },
  editImageButton: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray[400],
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  outerContainer: {
    height: "20%",
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 20,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
    gap: 20,
    alignItems: "center",
  },
  imageOptionContainer: {
    flexDirection: "row",
    gap: 20,
  },
});
