import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

import ChangeScreenTab from "@/components/button/ChangeScreenTab";
import BodyContainer from "@/components/ui/BodyContainer";
import { ManagingCategory as Category } from "@/enum/ManagingCategory";
import { AuthenticatedStackParamList, OtherStackParamList } from "@/types";

export type ManagingCategoryProps = CompositeScreenProps<
  NativeStackScreenProps<OtherStackParamList, "ManagingCategory">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const ManagingCategory: React.FC<ManagingCategoryProps> = ({ navigation }) => {
  return (
    <BodyContainer innerContainerStyle={styles.tabContainer}>
      <ChangeScreenTab
        icon="account-supervisor"
        screenName="Managing Roles"
        onPress={() =>
          navigation.navigate("ManagingList", {
            category: Category.ROLE,
          })
        }
      />
      <ChangeScreenTab
        icon="account-star"
        screenName="Parking Privilege"
        onPress={() =>
          navigation.navigate("ManagingList", {
            category: Category.PRIVILEGE,
          })
        }
      />
    </BodyContainer>
  );
};

export default ManagingCategory;

const styles = StyleSheet.create({
  tabContainer: {
    gap: 10,
    alignItems: "center",
  },
});
