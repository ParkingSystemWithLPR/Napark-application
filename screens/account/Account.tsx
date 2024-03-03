import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect, useState } from "react";
import { Alert, Dimensions, Image, StyleSheet, View } from "react-native";

import IconButton from "@/components/button/IconButton";
import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import DayInput from "@/components/input/DayInput";
import TextInput, { InputValueType } from "@/components/input/TextInput";
import BodyContainer from "@/components/ui/BodyContainer";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import Colors from "@/constants/color";
import { InputType } from "@/enum/InputType";
import { useAuth } from "@/store/context/auth";
import { useProfile } from "@/store/context/profile";
import { RootParamList } from "@/types";
import { formatISODate } from "@/utils/date";

export type AccountProps = NativeStackScreenProps<RootParamList, "Account">;

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
  const { profile: defaultProfile, updateProfile } = useProfile();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<ProfileInput>({
    firstname: { value: "" },
    lastname: { value: "" },
    email: { value: "" },
    dob: { value: "" },
    mobileNo: { value: "" },
  });
  const [isEditing, setEditing] = useState<boolean>(false);

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
        await updateProfile({
          body: {
            firstname: profile.firstname.value,
            lastname: profile.lastname.value,
            date_of_birth: profile.dob.value,
            tel: profile.mobileNo.value,
          },
          auth: { accessToken, authenticate },
        });
        setEditing(false);
      } catch (error) {
        Alert.alert(
          "Updating Failed",
          "Please try again!!: " + (error as Error).message
        );
      }
    }
  };
  if (isLoading) return <LoadingOverlay />;

  return (
    <BodyContainer>
      {!isEditing && (
        <View style={styles.headerContainer}>
          <Image
            style={styles.profileImage}
            source={{
              uri: "https://fastly.picsum.photos/id/157/200/300.jpg?hmac=-OZWQAIRoAdYWp7-qnHO1wl5t0TO3BMoAgW3tmR7wgE",
            }}
            height={IMAGE_SIZE}
            width={IMAGE_SIZE}
          />
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
});
