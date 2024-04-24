import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";

import SecondaryButton from "@/components/button/SecondaryButton";
import BodyText from "@/components/text/BodyText";
import BodyContainer from "@/components/ui/BodyContainer";
import Colors from "@/constants/color";
import { MOCKED_QR_CODE } from "@/mock/mockData";
import { useConfirmTransaction } from "@/store/api/payment/useConfirmTransaction";
import { useGetTopUpQRCode } from "@/store/api/payment/useGetTopUpQRCode";
import { useAuth } from "@/store/context/auth";
import { BookingsStackParamList, AuthenticatedStackParamList } from "@/types";
import { QRCode } from "@/types/payment";
import { formatDateAndTime } from "@/utils/date";

export type PaymentQRCodeProps = CompositeScreenProps<
  NativeStackScreenProps<BookingsStackParamList, "PaymentQRCode">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const IMAGE_SIZE = 250;

const PaymentQRCode: React.FC<PaymentQRCodeProps> = ({ route }) => {
  const amount = route.params.amount;
  const { accessToken, authenticate } = useAuth();
  const { mutateAsync: getTopUpQRCode } = useGetTopUpQRCode();
  const { mutateAsync: confirmTransaction } = useConfirmTransaction();
  const [QRCode, setQRCode] = useState<QRCode>(MOCKED_QR_CODE);

  const getQRCode = async () => {
    await getTopUpQRCode({
      body: { amount: amount },
      auth: { accessToken, authenticate },
    })
      .then((data) => {
        setQRCode(data);
      })
      .catch(() => {});
  };

  const onConfirmationClick = async () => {
    await confirmTransaction({
      queryParams: { transactionId: QRCode.id },
      auth: { accessToken, authenticate },
    })
      .then()
      .catch();
  };

  useEffect(() => {
    getQRCode();
  }, []);

  const renderImage = useCallback(() => {
    return (
      <Image
        source={{ uri: QRCode.image }}
        height={IMAGE_SIZE}
        width={IMAGE_SIZE}
        style={styles.image}
      />
    );
  }, [QRCode]);

  const renderEndTimeText = useCallback(() => {
    const { date, time } = formatDateAndTime(new Date(QRCode?.expire_at ?? ""));
    return (
      <BodyText
        text={`Please pay before ${date} ${time}`}
        containerStyle={{ alignSelf: "center" }}
      />
    );
  }, [QRCode]);

  return (
    <BodyContainer innerContainerStyle={styles.innerContainer}>
      {renderImage()}
      <View style={styles.textContainer}>
        <BodyText text="Scan QR Code to pay the bill" textStyle={styles.text} />
        <BodyText text={`Total amount: ฿ ${amount}`} textStyle={styles.text} />
      </View>
      {renderEndTimeText()}
      <SecondaryButton
        title="Press to complete payment"
        onPress={() => onConfirmationClick()}
      />
    </BodyContainer>
  );
};

export default PaymentQRCode;

const styles = StyleSheet.create({
  innerContainer: {
    gap: 10,
  },
  textContainer: {
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: Colors.red[400],
  },
  text: {
    color: Colors.white,
  },
  image: {
    alignSelf: "center",
  },
});
