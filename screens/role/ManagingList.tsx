import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";

import PrimaryButton from "@/components/button/PrimaryButton";
import RoleCard from "@/components/card/RoleCard";
import BodyText from "@/components/text/BodyText";
import SubHeaderText from "@/components/text/SubHeaderText";
import BodyContainer from "@/components/ui/BodyContainer";
import Colors from "@/constants/color";
import { ActionMode } from "@/enum/ActionMode";
import { ManagingCategory } from "@/enum/ManagingCategory";
import { useParkingLot } from "@/store/context/parkingLot";
import { AuthenticatedStackParamList, OtherStackParamList } from "@/types";

export type ManagingListProps = CompositeScreenProps<
  NativeStackScreenProps<OtherStackParamList, "ManagingList">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const ManagingList: React.FC<ManagingListProps> = ({ navigation, route }) => {
  const { parkingLot } = useParkingLot();
  const management_roles = parkingLot.management_roles;
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
          {management_roles.map((m, index) => {
            return (
              <RoleCard
                category={category}
                roleName={m.title}
                member={m.user_ids.length}
                onPress={() =>
                  navigation.navigate(
                    category === ManagingCategory.ROLE
                      ? "ConfigRole"
                      : "ConfigPrivilege",
                    {
                      mode: ActionMode.EDIT,
                      index: index,
                    }
                  )
                }
              />
            );
          })}
          {management_roles.length === 0 && (
            <BodyText
              text="No managing role created."
              textStyle={styles.noItemText}
            />
          )}
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
              index: management_roles.length,
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
  noItemText: {
    color: Colors.gray[700],
  },
});
