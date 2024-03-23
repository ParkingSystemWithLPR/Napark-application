import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback } from "react";
import { FlatList, View, StyleSheet, Pressable, Platform } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import HeaderText from "@/components/text/HeaderText";
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
        <View style={styles.container}>
          <Pressable
            android_ripple={{ color: Colors.gray[600] }}
            style={({ pressed }) => [pressed && styles.pressed]}
            onPress={() => pressLicensePlateHandler()}
          >
            <View style={styles.innerContainer}>
              <View style={styles.infoContainer}>
                <HeaderText
                  text={item.licensePlate}
                  textStyle={styles.licenseText}
                />
                <SubHeaderText text={item.province} />
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color={Colors.gray[800]}
              />
            </View>
          </Pressable>
        </View>
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
  container: {
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: Platform.OS === "android" ? 4 : 2,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  innerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  infoContainer: {},
  licenseText: {
    color: Colors.black,
  },
  pressed: {
    opacity: 0.5,
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.red[400],
    height: "100%",
    width: 100,
  },
});
