import { StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootParamList } from "../../types";
import ChangeScreenTab from "../../components/button/ChangeScreenTab";
import BodyContainer from "../../components/ui/BodyContainer";
import PrimaryButton from "../../components/button/PrimaryButton";
import { useAuth } from "../../store/context/auth";

export type OtherProps = {} & NativeStackScreenProps<RootParamList, "Other">;

const Other: React.FC<OtherProps> = () => {
  const { logout } = useAuth();
  return (
    <BodyContainer
      containerStyle={styles.container}
      innerContainerStyle={styles.tabContainer}
    >
      <ChangeScreenTab icon="lock-outline" screenName="Password & Security" />
      <ChangeScreenTab
        icon="alpha-p-circle-outline"
        screenName="My parking space"
      />
      <ChangeScreenTab icon="car-outline" screenName="Car info settings" />
      <ChangeScreenTab icon="cog-outline" screenName="Settings" />
      <ChangeScreenTab icon="information-outline" screenName="About Us" />
      <PrimaryButton
        title="Sign out"
        onPress={logout}
        buttonStyle={styles.button}
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "50%",
  },
});
