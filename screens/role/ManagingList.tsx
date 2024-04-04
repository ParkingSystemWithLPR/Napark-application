import PrimaryButton from "@/components/button/PrimaryButton";
import RoleCard from "@/components/card/RoleCard";
import SubHeaderText from "@/components/text/SubHeaderText";
import BodyContainer from "@/components/ui/BodyContainer";
import Colors from "@/constants/color";
import { ActionMode } from "@/enum/ActionMode";
import { ManagingCategory } from "@/enum/ManagingCategory";
import { AuthenticatedStackParamList, OtherStackParamList } from "@/types";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";

export type ManagingListProps = CompositeScreenProps<
  NativeStackScreenProps<OtherStackParamList, "ManagingList">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const ManagingList: React.FC<ManagingListProps> = ({ navigation, route }) => {
  const category = route.params.category;
  return (
    <BodyContainer innerContainerStyle={styles.container}>
      <View>
        <SubHeaderText text="EveryBody" />
        <View style={styles.roleCardContainer}>
          <RoleCard
            roleName="Everybody"
            member="All"
            onPress={() =>
              navigation.navigate(
                category === ManagingCategory.ROLE
                  ? "ConfigRole"
                  : "ConfigPrivilege",
                {
                  mode: ActionMode.EDIT,
                  roleId: "all",
                }
              )
            }
          />
        </View>
        <View style={styles.divider} />
        <SubHeaderText
          text={`Other ${
            category === ManagingCategory.ROLE ? "Roles" : "Privileges"
          }`}
        />
        <View style={styles.roleCardContainer}>
          <RoleCard roleName="VVIP" member="2" onPress={() => {}} />
          <RoleCard roleName="C-level" member="10" onPress={() => {}} />
        </View>
      </View>
      <PrimaryButton
        title={`+ Add new ${
          category === ManagingCategory.ROLE ? "role" : "privilege"
        }`}
        onPress={() => {
          navigation.navigate("ConfigRole", {
            mode: ActionMode.CREATE,
          });
        }}
      />
    </BodyContainer>
  );
};

export default ManagingList;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    paddingBottom: 50,
  },
  divider: {
    borderWidth: 0.5,
    borderColor: Colors.red[200],
    marginVertical: 15,
  },
  roleCardContainer: {
    paddingTop: 10,
    gap: 5,
  },
});
