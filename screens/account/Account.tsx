import { useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootParamList } from "../../types";
import TextInput from "../../components/input/TextInput";
import BodyContainer from "../../components/ui/BodyContainer";
import Colors from "../../constants/color";
import IconButton from "../../components/button/IconButton";
import PrimaryButton from "../../components/button/PrimaryButton";
import SecondaryButton from "../../components/button/SecondaryButton";

export type AccountProps = {} & NativeStackScreenProps<
  RootParamList,
  "Account"
>;

const IMAGE_SIZE = 100;

const Account: React.FC<AccountProps> = () => {
  const [isEditing, setEditing] = useState<boolean>(false);
  const profile = {
    firstname: "John",
    lastname: "Doe",
    email: "a@a.com",
    dob: "2002-05-05",
    tel: "061-708-1377",
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
            placeholder="Your firstname"
            value={profile.firstname}
            onChangeText={() => {}}
            isRequired={isEditing}
            containerStyle={styles.infoInput}
            editable={isEditing}
          />
          <TextInput
            title="Lastname"
            placeholder="Your lastname"
            value={profile.lastname}
            onChangeText={() => {}}
            isRequired={isEditing}
            containerStyle={styles.infoInput}
            editable={isEditing}
          />
        </View>
        <TextInput
          title="Email"
          placeholder="Your email"
          value={profile.email}
          onChangeText={() => {}}
          isRequired={isEditing}
          editable={isEditing}
        />
        <View style={styles.rowContainer}>
          <TextInput
            title="Date of birth"
            placeholder="Your birthdate"
            value={profile.dob}
            onChangeText={() => {}}
            isRequired={isEditing}
            containerStyle={styles.infoInput}
            editable={isEditing}
          />
          <TextInput
            title="Mobile No."
            placeholder="08x-xxx-xxxx"
            value={profile.tel}
            onChangeText={() => {}}
            isRequired={isEditing}
            containerStyle={styles.infoInput}
            editable={isEditing}
          />
        </View>
        {isEditing && (
          <View style={styles.buttonContainer}>
            <SecondaryButton title="Cancel" onPress={() => setEditing(false)} />
            <PrimaryButton title="Save" onPress={() => {}} />
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
  },
});
