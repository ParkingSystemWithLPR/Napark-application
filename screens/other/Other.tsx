import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";

import ChangeScreenTab from "@/components/button/ChangeScreenTab";
import PrimaryButton from "@/components/button/PrimaryButton";
import SubHeaderText from "@/components/text/SubHeaderText";
import BodyContainer from "@/components/ui/BodyContainer";
import Colors from "@/constants/color";
import { useGetProfile } from "@/store/api/user/useGetProfile";
import { useAuth } from "@/store/context/auth";
import {
  MainPageBottomTabParamList,
  AuthenticatedStackParamList,
} from "@/types";

export type OtherProps = CompositeScreenProps<
  NativeStackScreenProps<MainPageBottomTabParamList, "Other">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const Other: React.FC<OtherProps> = ({ navigation }) => {
  const { accessToken, authenticate, logout } = useAuth();
  // const { getProfile } = useGetProfile({ auth: { accessToken, authenticate } });
  // const hasManagePermission = getProfile.management_role
  const hasManagePermission = true;
  return (
    <BodyContainer
      containerStyle={styles.container}
      innerContainerStyle={styles.tabContainer}
    >
      <SubHeaderText
        containerStyle={{
          width: "100%",
        }}
        text="Parking space's owner options"
      />
      <ChangeScreenTab
        icon="alpha-p-circle-outline"
        screenName="My parking space"
        onPress={() => {
          navigation.push("OtherStack", { screen: "ParkingLotsList" });
        }}
      />
      <View style={styles.separator} />
      <SubHeaderText
        containerStyle={{
          width: "100%",
          // marginTop: 10,
          // borderTopWidth: 1,
          paddingTop: 5,
          // borderColor: Colors.gray[800],
        }}
        text="Application user options"
      />
      <ChangeScreenTab
        icon="car-outline"
        screenName="Car info settings"
        onPress={() => {
          navigation.push("OtherStack", { screen: "CarInfo" });
        }}
      />
      <ChangeScreenTab
        icon="lock-outline"
        screenName="Change password"
        onPress={() => {
          navigation.push("OtherStack", { screen: "ChangePassword" });
        }}
      />
      {/* <ChangeScreenTab
        icon="cog-outline"
        screenName="Settings"
        onPress={() => {}}
      />
      <ChangeScreenTab
        icon="information-outline"
        screenName="About Us"
        onPress={() => {}}
      /> */}
      <PrimaryButton
        title="Sign out"
        onPress={logout}
        outerContainerStyle={styles.button}
      />
    </BodyContainer>
  );
};

export default Other;

const styles = StyleSheet.create({
  container: {},
  tabContainer: {
    gap: 10,
    alignItems: "center",
  },
  button: {
    marginTop: 20,
  },
  separator: {
    marginTop: 10,
    width: "100%",
    height: 1,
    backgroundColor: Colors.gray[800],
  },
});
