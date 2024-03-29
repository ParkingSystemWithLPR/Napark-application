import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

import IconButton from "@/components/button/IconButton";
import HeaderText from "@/components/text/HeaderText";
import SubHeaderText from "@/components/text/SubHeaderText";
import BodyContainer from "@/components/ui/BodyContainer";
import Colors from "@/constants/color";
import {
  MOCKED_PAYMENTLICENSEPLATE,
  mockedPaymentLicensePlateProps,
} from "@/mock/mockData";
import {
  MainPageBottomTabParamList,
  AuthenticatedStackParamList,
} from "@/types";

export type PaymentProps = CompositeScreenProps<
  NativeStackScreenProps<MainPageBottomTabParamList, "Payment">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const mockBalance = 60.0;

const Payment: React.FC<PaymentProps> = ({ navigation }) => {
  const pressLicensePlateHandler = (item: mockedPaymentLicensePlateProps) => {
    navigation.navigate("PaymentStack", {
      screen: "PaymentSummary",
      params: { balance: mockBalance, paymentDetail: item },
    });
  };

  const pressTopUpHandler = () => {
    navigation.navigate("PaymentStack", {
      screen: "TopUp",
      params: { balance: mockBalance },
    });
  };

  const renderLicensePlateList = useCallback(
    (item: mockedPaymentLicensePlateProps) => {
      return (
        <View style={styles.container}>
          <Pressable
            android_ripple={{ color: Colors.gray[600] }}
            style={({ pressed }) => [pressed && styles.pressed]}
            onPress={() => pressLicensePlateHandler(item)}
          >
            <View style={styles.innerContainer}>
              <View>
                <HeaderText
                  text={item.licensePlate}
                  textStyle={styles.licenseText}
                />
                <SubHeaderText text={item.province} />
              </View>
              <HeaderText
                text={`${item.total} ฿`}
                textStyle={[styles.licenseText]}
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
      <View style={{ flex: 1 }}>
        <View style={styles.card}>
          <View style={{ marginHorizontal: 20 }}>
            <View
              style={{
                borderBottomWidth: 1,
              }}
            >
              <SubHeaderText text={"Wallet"} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <HeaderText
                text={`${mockBalance} ฿`}
                textStyle={{ color: Colors.black }}
              />
              <IconButton
                icon={"wallet-plus"}
                size={25}
                color={Colors.blue[600]}
                onPress={pressTopUpHandler}
              />
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <SubHeaderText text={"Pay the bill"} textStyle={{ fontSize: 20 }} />
          <FlatList
            data={MOCKED_PAYMENTLICENSEPLATE}
            renderItem={({ item }) => {
              return renderLicensePlateList(item);
            }}
            keyExtractor={(item) => item.id}
            overScrollMode="never"
          />
        </View>
      </View>
    </BodyContainer>
  );
};

export default Payment;

const styles = StyleSheet.create({
  textContainer: {
    color: Colors.gray[800],
    textAlign: "center",
    fontSize: 16,
  },
  card: {
    gap: 10,
    paddingVertical: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    borderRadius: 16,
    backgroundColor: Colors.white,
    marginBottom: 10,
  },
  creditBalanceText: {
    fontSize: 20,
    color: Colors.red[400],
  },
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
    elevation: 4,
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
