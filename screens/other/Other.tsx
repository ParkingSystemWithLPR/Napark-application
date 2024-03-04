import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

import ChangeScreenTab from "@/components/button/ChangeScreenTab";
import PrimaryButton from "@/components/button/PrimaryButton";
import BodyContainer from "@/components/ui/BodyContainer";
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
  const { logout } = useAuth();
  return (
    <BodyContainer
      containerStyle={styles.container}
      innerContainerStyle={styles.tabContainer}
    >
      <ChangeScreenTab
        icon="lock-outline"
        screenName="Change password"
        onPress={() => {
          navigation.push("OtherStack", { screen: "ChangePassword" });
        }}
      />
      <ChangeScreenTab
        icon="alpha-p-circle-outline"
        screenName="My parking space"
        onPress={() => {
          navigation.push("OtherStack", { screen: "ParkingLotsList" });
        }}
      />
      <ChangeScreenTab
        icon="car-outline"
        screenName="Car info settings"
        onPress={() => {
          navigation.push("OtherStack", { screen: "CarInfo" });
        }}
      />
      <ChangeScreenTab
        icon="cog-outline"
        screenName="Settings"
        onPress={() => {}}
      />
      <ChangeScreenTab
        icon="information-outline"
        screenName="About Us"
        onPress={() => {}}
      />
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
});
