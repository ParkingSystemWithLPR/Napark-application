import { useLayoutEffect, useState } from "react";
import { Alert, Dimensions, Image, StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootParamList } from "../../types";
import TextInput, { InputValueType } from "../../components/input/TextInput";
import BodyContainer from "../../components/ui/BodyContainer";
import Colors from "../../constants/color";
import IconButton from "../../components/button/IconButton";
import PrimaryButton from "../../components/button/PrimaryButton";
import SecondaryButton from "../../components/button/SecondaryButton";
import DayInput from "../../components/input/DayInput";
import user, { Profile } from "../../utils/user";
import { formatISODate } from "../../utils/date";
import { useAuth } from "../../store/context/auth";

export type AccountProps = {} & NativeStackScreenProps<
  RootParamList,
  "Account"
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
  const [defaultProfile, setDefaultProfile] = useState<ProfileInput>({
    firstname: { value: "" },
    lastname: { value: "" },
    email: { value: "" },
    dob: { value: "" },
    mobileNo: { value: "" },
  });
  const [profile, setProfile] = useState<ProfileInput>({
    firstname: { value: "" },
    lastname: { value: "" },
    email: { value: "" },
    dob: { value: "" },
    mobileNo: { value: "" },
  });
  const [isEditing, setEditing] = useState<boolean>(false);

  useLayoutEffect(() => {
    (async () => {
      const profile: Profile = await user.getProfile(accessToken, authenticate);
      const modProfile: ProfileInput = {
        firstname: { value: profile.firstname },
        lastname: { value: profile.lastname },
        email: { value: profile.email },
        mobileNo: { value: profile.tel },
        dob: { value: formatISODate(profile.date_of_birth) },
      };
      setDefaultProfile(modProfile);
      setProfile(modProfile);
    })();
  }, []);

  const handleOnChangeText = (identifierKey: string, enteredValue: string) => {
    setProfile((curInputValue: ProfileInput) => {
      return {
        ...curInputValue,
        [identifierKey]: { value: enteredValue },
      };
    });
  };

  const onCancel = () => {
    setProfile(defaultProfile);
    setEditing(false);
  };

  const onSave = async () => {
    try {
      await user.editProfile(
        {
          firstname: profile.firstname.value,
          lastname: profile.lastname.value,
          date_of_birth: new Date(profile.dob.value).toISOString(),
          tel: profile.mobileNo.value,
        },
        accessToken,
        authenticate
      );
      setDefaultProfile(profile);
      setEditing(false);
    } catch (error) {
      Alert.alert(
        "Updating Failed",
        "Please try again!!: " + (error as Error).message
      );
    }
  };

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
            color={Colors.gray[900]}
            onPress={() => setEditing(true)}
          />
        </View>
      )}
      <View style={styles.informationContainer}>
        <View style={styles.rowContainer}>
          <TextInput
            title="Firstname"
            placeholder="John"
            value={profile.firstname.value}
            onChangeText={handleOnChangeText.bind(this, "firstname")}
            containerStyle={styles.infoInput}
            editable={isEditing}
          />
          <TextInput
            title="Lastname"
            placeholder="Doe"
            value={profile.lastname.value}
            onChangeText={handleOnChangeText.bind(this, "lastname")}
            containerStyle={styles.infoInput}
            editable={isEditing}
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
            placeholder="08x-xxx-xxxx"
            value={profile.mobileNo.value}
            onChangeText={handleOnChangeText.bind(this, "mobileNo")}
            containerStyle={styles.infoInput}
            editable={isEditing}
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
  },
  informationContainer: {
    gap: 5,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
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
