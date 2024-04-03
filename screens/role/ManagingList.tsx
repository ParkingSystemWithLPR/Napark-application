import ChangeScreenTab from "@/components/button/ChangeScreenTab";
import BodyContainer from "@/components/ui/BodyContainer";
import { AuthenticatedStackParamList, OtherStackParamList } from "@/types";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

export type ManagingListProps = CompositeScreenProps<
  NativeStackScreenProps<OtherStackParamList, "ManagingList">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const ManagingList: React.FC<ManagingListProps> = ({ navigation }) => {
  return (
    <BodyContainer innerContainerStyle={styles.tabContainer}>
      <ChangeScreenTab
        icon="account-supervisor"
        screenName="Roles Configuration"
        onPress={() => navigation.navigate("RoleList")}
      />
      <ChangeScreenTab
        icon="account-star"
        screenName="Privilege Configuration"
        onPress={() => navigation.navigate("PrivilegeList")}
      />
    </BodyContainer>
  );
};

export default ManagingList;

const styles = StyleSheet.create({
  tabContainer: {
    gap: 10,
    alignItems: "center",
  },
});
