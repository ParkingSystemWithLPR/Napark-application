import ChangeScreenTab from "@/components/button/ChangeScreenTab";
import BodyContainer from "@/components/ui/BodyContainer";
import { AuthenticatedStackParamList, OtherStackParamList } from "@/types";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { ManagingCategory as Category } from "@/enum/ManagingCategory";

export type ManagingCategoryProps = CompositeScreenProps<
  NativeStackScreenProps<OtherStackParamList, "ManagingCategory">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const ManagingCategory: React.FC<ManagingCategoryProps> = ({ navigation }) => {
  return (
    <BodyContainer innerContainerStyle={styles.tabContainer}>
      <ChangeScreenTab
        icon="account-supervisor"
        screenName="Roles Configuration"
        onPress={() =>
          navigation.navigate("ManagingList", {
            category: Category.ROLE,
          })
        }
      />
      <ChangeScreenTab
        icon="account-star"
        screenName="Privilege Configuration"
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
