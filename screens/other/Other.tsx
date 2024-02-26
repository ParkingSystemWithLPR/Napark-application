import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

import ChangeScreenTab from "../../components/button/ChangeScreenTab";
import PrimaryButton from "../../components/button/PrimaryButton";
import BodyContainer from "../../components/ui/BodyContainer";
import { useAuth } from "../../store/context/auth";
import { RootParamList } from "../../types";

export type OtherProps = NativeStackScreenProps<RootParamList, "Other">;

const Other: React.FC<OtherProps> = ({ navigation }) => {
  const { logout } = useAuth();
  return (
    <BodyContainer
      containerStyle={styles.container}
      innerContainerStyle={styles.tabContainer}
    >
      <ChangeScreenTab
        icon="lock-outline"
        screenName="Password & Security"
        onPress={() => {}}
      />
      <ChangeScreenTab
        icon="alpha-p-circle-outline"
        onPress={() => {navigation.navigate("ParkingLotsList")}}
        screenName="My parking space"
      />
      <ChangeScreenTab
        icon="car-outline"
        screenName="Car info settings"
        onPress={() => {}}
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
