import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import BodyContainer from "@/components/ui/BodyContainer";
import { OtherStackParamList, AuthenticatedStackParamList } from "@/types";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";

export type PrivilegeMemberProps = CompositeScreenProps<
  NativeStackScreenProps<OtherStackParamList, "PrivilegeMember">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const PrivilegeMember: React.FC<PrivilegeMemberProps> = ({ navigation }) => {
  return (
    <BodyContainer>
      <View style={styles.buttonContainer}>
        <SecondaryButton title="Cancel" onPress={() => navigation.goBack()} />
        <PrimaryButton title="Save" onPress={() => navigation.goBack()} />
      </View>
    </BodyContainer>
  );
};

export default PrivilegeMember;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
