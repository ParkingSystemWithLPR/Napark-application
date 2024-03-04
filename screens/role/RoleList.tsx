import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";

import RoleCard from "@/components/card/RoleCard";
import SubHeaderText from "@/components/text/SubHeaderText";
import BodyContainer from "@/components/ui/BodyContainer";
import Colors from "@/constants/color";
import { OtherStackParamList, AuthenticatedStackParamList } from "@/types";

export type RoleListProps = CompositeScreenProps<
  NativeStackScreenProps<OtherStackParamList, "RoleList">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const RoleList: React.FC<RoleListProps> = () => {
  return (
    <BodyContainer>
      <SubHeaderText text="Everybody" />
      <View style={styles.roleCardContainer}>
        <RoleCard roleName="Everybody" member="All" onPress={() => {}} />
      </View>
      <View style={styles.divider}></View>
      <SubHeaderText text="Other Roles" />
      <View style={styles.roleCardContainer}>
        <RoleCard roleName="VVIP" member="2" onPress={() => {}} />
        <RoleCard roleName="C-level" member="10" onPress={() => {}} />
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
