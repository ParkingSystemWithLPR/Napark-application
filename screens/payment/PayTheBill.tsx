import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback } from "react";
import { FlatList, TouchableOpacity, View, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import SubHeaderText from "@/components/text/SubHeaderText";
import BodyContainer from "@/components/ui/BodyContainer";
import Colors from "@/constants/color";
import {
  MOCKED_PAYMENTLICENSEPLATE,
  mockedPaymentLicensePlateProps,
} from "@/mock/mockData";
import { AuthenticatedStackParamList, PaymentStackParamList } from "@/types";

export type PayTheBillProps = CompositeScreenProps<
  NativeStackScreenProps<PaymentStackParamList, "PayTheBill">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const PayTheBill: React.FC<PayTheBillProps> = ({ navigation }) => {
  const pressLicensePlateHandler = () => {
    navigation.navigate("PaymentSummary");
  };

  const renderLicensePlateList = useCallback(
    (item: mockedPaymentLicensePlateProps) => {
      return (
        <TouchableOpacity onPress={pressLicensePlateHandler}>
          <View style={styles.licensePlate}>
            <SubHeaderText text={item.licensePlate} />
            <MaterialIcons name="chevron-right" size={20}></MaterialIcons>
          </View>
        </TouchableOpacity>
      );
    },
    []
  );

  return (
    <BodyContainer>
      <FlatList
        data={MOCKED_PAYMENTLICENSEPLATE}
        renderItem={({ item }) => {
          return renderLicensePlateList(item);
        }}
        keyExtractor={(item) => item.id}
        overScrollMode="never"
      />
    </BodyContainer>
  );
};
export default PayTheBill;

const styles = StyleSheet.create({
  licensePlate: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: Colors.white,
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    borderColor: Colors.gray[800],
  },
});
