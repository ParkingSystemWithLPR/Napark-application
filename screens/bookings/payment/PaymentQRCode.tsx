import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";

import PrimaryButton from "@/components/button/PrimaryButton";
import BodyText from "@/components/text/BodyText";
import BodyContainer from "@/components/ui/BodyContainer";
import Colors from "@/constants/color";
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

const PaymentQRCode: React.FC<PaymentQRCodeProps> = ({ navigation, route }) => {
  const amount = route.params.amount;
  const { accessToken, authenticate } = useAuth();
  const { mutateAsync: getTopUpQRCode } = useGetTopUpQRCode();
  const { mutateAsync: confirmTransaction } = useConfirmTransaction();
  const [QRCode, setQRCode] = useState<QRCode>();

  const getQRCode = async () => {
    await getTopUpQRCode(
      {
        body: { amount: amount },
        auth: { accessToken, authenticate },
      },
      {
        onSuccess(data) {
          setQRCode(data);
        },
      }
    );
  };

  const onConfirmationClick = async () => {
    await confirmTransaction({
      queryParams: { transactionId: QRCode?.id ?? "" },
      auth: { accessToken, authenticate },
    })
      .then()
      .catch();

    navigation.navigate("MainScreen", { screen: "Bookings" });
  };

  useEffect(() => {
    getQRCode();
  }, []);

  const renderImage = useCallback(() => {
    return (
      <Image
        source={{ uri: QRCode?.image }}
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

export default PaymentQRCode;

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
