import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";

import PrimaryButton from "@/components/button/PrimaryButton";
import RoleCard from "@/components/card/RoleCard";
import SubHeaderText from "@/components/text/SubHeaderText";
import BodyContainer from "@/components/ui/BodyContainer";
import Colors from "@/constants/color";
import { ActionMode } from "@/enum/ActionMode";
import { ManagingCategory } from "@/enum/ManagingCategory";
import { AuthenticatedStackParamList, OtherStackParamList } from "@/types";

export type ManagingListProps = CompositeScreenProps<
  NativeStackScreenProps<OtherStackParamList, "ManagingList">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const ManagingList: React.FC<ManagingListProps> = ({ navigation, route }) => {
  const category = route.params.category;
  return (
    <BodyContainer innerContainerStyle={styles.container}>
      <View>
        <SubHeaderText
          text={`List of ${
            category === ManagingCategory.ROLE
              ? "Managing Roles"
              : "Parking Privileges"
          }`}
        />
        <View style={styles.roleCardContainer}>
          <RoleCard
            category={category}
            roleName="VVIP"
            member="2"
            onPress={() =>
              navigation.navigate(
                category === ManagingCategory.ROLE
                  ? "ConfigRole"
                  : "ConfigPrivilege",
                {
                  mode: ActionMode.EDIT,
                  roleId: "1",
                }
              )
            }
          />
          <RoleCard
            category={category}
            roleName="C-level"
            member="10"
            onPress={() =>
              navigation.navigate(
                category === ManagingCategory.ROLE
                  ? "ConfigRole"
                  : "ConfigPrivilege",
                {
                  mode: ActionMode.EDIT,
                  roleId: "1",
                }
              )
            }
          />
        </View>
      </View>
      <PrimaryButton
        title={`+ Add new ${
          category === ManagingCategory.ROLE ? "role" : "privilege"
        }`}
        onPress={() => {
          navigation.navigate(
            category === ManagingCategory.ROLE
              ? "ConfigRole"
              : "ConfigPrivilege",
            {
              mode: ActionMode.CREATE,
            }
          );
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
