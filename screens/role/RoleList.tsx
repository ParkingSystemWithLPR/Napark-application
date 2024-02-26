import { StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootParamList } from "../../types";
import BodyContainer from "../../components/ui/BodyContainer";
import SubHeaderText from "../../components/text/SubHeaderText";
import RoleCard from "../../components/card/RoleCard";
import Colors from "../../constants/color";

export type RoleListProps = {} & NativeStackScreenProps<
  RootParamList,
  "RoleList"
>;

const RoleList: React.FC<RoleListProps> = ({ navigation }) => {
  return (
    <BodyContainer>
      <SubHeaderText text="Everybody" />
      <View style={styles.roleCardContainer}>
        <RoleCard roleName="Everybody" member="All" onPress={() => {}} />
      </View>
      <View style={styles.divider}>
      </View>
      <SubHeaderText text="Other Roles" />
      <View style={styles.roleCardContainer}>
        <RoleCard roleName="Everybody" member="All" onPress={() => {}} />
        <RoleCard roleName="Everybody" member="All" onPress={() => {}} />
        <RoleCard roleName="Everybody" member="All" onPress={() => {}} />
        <RoleCard roleName="Everybody" member="All" onPress={() => {}} />
      </View>
    </BodyContainer>
  );
};

export default RoleList;

const styles = StyleSheet.create({
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
