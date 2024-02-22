import { View, StyleSheet } from "react-native";
import PrimaryButton from "../../components/button/PrimaryButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../../types";
import ParkingSpaceCard from "../../components/card/ParkingSpaceCard";
import Body from "../../components/body/Body";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "react-native/Libraries/NewAppScreen";

export type ParkingLotsListProps = {} & NativeStackScreenProps<
  RootParamList,
  "ParkingLotsList"
>;

const ParkingLotsList: React.FC<ParkingLotsListProps> = ({ navigation }) => {
  const useGetParkingLot = () => {
    return { name: "PolSci's Parking Building", businessHours: "08.00 - 00.00", availability: "0"};
  }
  const parkingLot = useGetParkingLot();
  
  const handleRequestParkingSpacePress = () => {
    navigation.replace("RequestParkingLot");
  };

  const NoParkingLot = () => {
    return (
      <View>
        <MaterialCommunityIcons
          name={"sad"}
          size={20}
          color={Colors.gray[800]}
          // style={styles.icon}
        />
        <PrimaryButton
          title="Request for your parking space"
          onPress={handleRequestParkingSpacePress}
        />
      </View>
    );
  }

  return (
    <View>
      <Body>
        <View style={styles.bodyContainer}>
          <ParkingSpaceCard
            parkingSpaceName={"PolSci’s Parking building"}
            businessHours={"08.00 - 00.00"}
            availabilty={20}
            onPress={() => navigation.replace("ParkingLotDetail")}
          />
          <ParkingSpaceCard
            parkingSpaceName={"PolSci’s Parking building"}
            businessHours={"08.00 - 00.00"}
            availabilty={20}
            onPress={() => navigation.replace("ParkingLotDetail")}
          />
        </View>
        <PrimaryButton
          title="Request for your parking space"
          onPress={handleRequestParkingSpacePress}
        />
      </Body>
    </View>
  );
};

export default ParkingLotsList;

const styles = StyleSheet.create({
  bodyContainer: {
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});
