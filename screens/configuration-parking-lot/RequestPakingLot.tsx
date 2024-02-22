import { View } from "react-native";
import HeaderText from "../../components/text/HeaderText";
import PrimaryButton from "../../components/button/PrimaryButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../../types";

export type RequestParkingLotProps = {} & NativeStackScreenProps<
  RootParamList,
  "RequestParkingLot"
>;

const RequestParkingLot: React.FC<RequestParkingLotProps> = ({ navigation }) => {
  const handleRequestParkingSpacePress = () => {
    navigation.replace("ParkingLotsList");
  }

  return (
    <View>
      <HeaderText text="Parking Lots List" />
      <PrimaryButton
        title="Back"
        onPress={handleRequestParkingSpacePress}
      />
    </View>
  );
};

export default RequestParkingLot;
