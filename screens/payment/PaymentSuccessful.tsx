import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView, View, Image, StyleSheet } from "react-native";

import PrimaryButton from "@/components/button/PrimaryButton";
import BodyText from "@/components/text/BodyText";
import SubHeaderText from "@/components/text/SubHeaderText";
import Colors from "@/constants/color";
import { AuthenticatedStackParamList, PaymentStackParamList } from "@/types";

export type PaymentSuccessfulProps = CompositeScreenProps<
  NativeStackScreenProps<PaymentStackParamList, "PaymentSuccessful">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;
const IMAGE_HEIGHT = 200;
const IMAGE_WIDTH = 250;

const PaymentSuccessful: React.FC<PaymentSuccessfulProps> = ({
  navigation,
}) => {
  const handleConfirm = () => {
    navigation.navigate("MainScreen", { screen: "Payment" });
  };
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.outerContainer}>
        <Image
          source={{
            uri: "https://fastly.picsum.photos/id/157/200/300.jpg?hmac=-OZWQAIRoAdYWp7-qnHO1wl5t0TO3BMoAgW3tmR7wgE",
          }}
          height={IMAGE_HEIGHT}
          width={IMAGE_WIDTH}
          style={{ alignSelf: "center" }}
        />
        <View style={{ alignItems: "center", gap: 20 }}>
          <SubHeaderText
            text={"Transaction successfully!"}
            textStyle={styles.blueText}
          />
          <BodyText text={"You 've pay your bill!"} />
        </View>
        <PrimaryButton
          title={"Confirm"}
          onPress={handleConfirm}
          outerContainerStyle={{ paddingHorizontal: 40 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default PaymentSuccessful;

const styles = StyleSheet.create({
  screen: { flex: 1 },
  outerContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 40,
    paddingHorizontal: 20,
  },
  blueText: {
    color: Colors.blue[600],
  },
});
