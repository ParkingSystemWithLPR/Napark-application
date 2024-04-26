import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";

import PrimaryButton from "@/components/button/PrimaryButton";
import BodyText from "@/components/text/BodyText";
import BodyContainer from "@/components/ui/BodyContainer";
import Colors from "@/constants/color";
import { useConfirmTransaction } from "@/store/api/payment/useConfirmTransaction";
import { useGetTopUpQRcode } from "@/store/api/payment/useGetTopUpQRcode";
import { useAuth } from "@/store/context/auth";
import { BookingsStackParamList, AuthenticatedStackParamList } from "@/types";
import { QRcode } from "@/types/payment";
import { formatDateAndTime } from "@/utils/date";

export type PaymentQRcodeProps = CompositeScreenProps<
  NativeStackScreenProps<BookingsStackParamList, "PaymentQRcode">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const IMAGE_SIZE = 250;

const PaymentQRcode: React.FC<PaymentQRcodeProps> = ({ navigation, route }) => {
  const amount = route.params.amount;
  const { accessToken, authenticate } = useAuth();
  const { mutateAsync: getTopUpQRcode } = useGetTopUpQRcode();
  const { mutateAsync: confirmTransaction } = useConfirmTransaction();
  const [QRcode, setQRcode] = useState<QRcode>();

  const getQRcode = async () => {
    await getTopUpQRcode(
      {
        body: { amount: amount },
        auth: { accessToken, authenticate },
      },
      {
        onSuccess(data) {
          setQRcode(data);
        },
      }
    );
  };

  const onConfirmationClick = async () => {
    await confirmTransaction({
      queryParams: { transactionId: QRcode?.id ?? "" },
      auth: { accessToken, authenticate },
    })
      .then()
      .catch();

    navigation.navigate("MainScreen", { screen: "Bookings" });
  };

  useEffect(() => {
    getQRcode();
  }, []);

  const renderImage = useCallback(() => {
    return (
      <Image
        source={{ uri: QRcode?.image }}
        height={IMAGE_SIZE}
        width={IMAGE_SIZE}
        style={styles.image}
      />
    );
  }, [QRcode]);

  const renderEndTimeText = useCallback(() => {
    const { date, time } = formatDateAndTime(new Date(QRcode?.expire_at ?? ""));
    return (
      <BodyText
        text={`Please pay before ${date} ${time}`}
        containerStyle={{ alignSelf: "center" }}
      />
    );
  }, [QRcode]);

  return (
    <BodyContainer innerContainerStyle={styles.innerContainer}>
      {renderImage()}
      <View style={styles.textContainer}>
        <BodyText text={`Total amount: ฿ ${amount}`} />
        {renderEndTimeText()}
      </View>
      <PrimaryButton
        title="Back to home"
        onPress={() => onConfirmationClick()}
      />
    </BodyContainer>
  );
};

export default PaymentQRcode;

const styles = StyleSheet.create({
  innerContainer: {
    gap: 10,
  },
  textContainer: {
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 8,
    gap: 10,
  },
  text: {
    color: Colors.white,
  },
  image: {
    alignSelf: "center",
  },
});
