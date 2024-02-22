import { useState } from "react";
import { StyleSheet, View } from "react-native";
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
            isRequired
            containerStyle={styles.infoInput}
            editable={isEditing}
          />
          <TextInput
            title="Lastname"
            placeholder="Your lastname"
            value={profile.lastname}
            onChangeText={() => {}}
            isRequired
            containerStyle={styles.infoInput}
            editable={isEditing}
          />
        </View>
        <TextInput
          title="Email"
          placeholder="Your email"
          value={profile.email}
          onChangeText={() => {}}
          isRequired
          editable={isEditing}
        />
        <View style={styles.rowContainer}>
          <TextInput
            title="Date of birth"
            placeholder="Your birthdate"
            value={profile.dob}
            onChangeText={() => {}}
            isRequired
            containerStyle={styles.infoInput}
            editable={isEditing}
          />
          <TextInput
            title="Mobile No."
            placeholder="08x-xxx-xxxx"
            value={profile.tel}
            onChangeText={() => {}}
            isRequired
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

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
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
