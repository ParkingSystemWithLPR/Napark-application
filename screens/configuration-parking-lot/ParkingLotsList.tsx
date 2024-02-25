import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import PrimaryButton from "../../components/button/PrimaryButton";
import { RootParamList } from "../../types";
import ParkingSpaceCard from "../../components/card/ParkingSpaceCard";
import BodyContainer from "../../components/ui/BodyContainer";
import Colors from "../../constants/color";
import HeaderText from "../../components/text/HeaderText";
// import { getParkingLots } from "../../store/api/useGetParkingLots";

export type ParkingLotsListProps = {} & NativeStackScreenProps<
  RootParamList,
  "ParkingLotsList"
>;

export type ParkingLot = {
  id: string,
  name: string,
  businessHours: string,
  availability: number,
};

const ParkingLotsList: React.FC<ParkingLotsListProps> = ({ navigation }) => {

  // const parkingLots = getParkingLots("65d76b018143af9faf0283fd");
  const useGetParkingLot = () : ParkingLot[] => {
    return [
      {
        id: "0",
        name: "PolSci's Parking Building",
        businessHours: "08.00 - 00.00",
        availability: 0,
      },
      {
        id: "1",
        name: "PolSci's Parking Building",
        businessHours: "08.00 - 00.00",
        availability: 0,
      },
      {
        id: "2",
        name: "PolSci's Parking Building",
        businessHours: "08.00 - 00.00",
        availability: 0,
      },
      {
        id: "3",
        name: "PolSci's Parking Building",
        businessHours: "08.00 - 00.00",
        availability: 0,
      },
      {
        id: "4",
        name: "PolSci's Parking Building",
        businessHours: "08.00 - 00.00",
        availability: 0,
      },
    ];
  };
  const parkingLots = useGetParkingLot();

  const handleRequestParkingSpacePress = () => {
    navigation.push("RequestParkingLot");
  };

  const NoParkingLot = () => {
    return (
      <View style={styles.noParkingContainer}>
        <MaterialCommunityIcons
          name={"emoticon-sad-outline"}
          size={100}
          color={Colors.gray[700]}
          // style={styles.icon}
        />
        <HeaderText
          text="You don't have any parking space"
          textStyle={styles.noParkingText}
        />
      </View>
    );
  };

  return (
    <BodyContainer
      innerContainerStyle={
        parkingLots ? styles.bodyContainer : styles.bodyContainerNoParking
      }
    >
      {parkingLots ? (
        <View style={styles.parkingSpaceCardContainer}>
          <FlatList
            data={parkingLots}
            renderItem={({item}) => (
              <ParkingSpaceCard
                parkingSpaceName={item.name}
                businessHours={item.businessHours}
                availabilty={item.availability}
                onPress={() => navigation.push("ParkingLotDetail")}
              />
            )}
          />
        </View>
      ) : (
        <NoParkingLot></NoParkingLot>
      )}
      <PrimaryButton
        title="Request for your parking space"
        onPress={handleRequestParkingSpacePress}
      />
    </BodyContainer>
  );
};

export default ParkingLotsList;

const styles = StyleSheet.create({
  bodyContainer: {
    gap: 20,
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  bodyContainerNoParking: {
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  parkingSpaceCardContainer: {
    alignItems: "center",
    maxHeight: "85%",
    overflow: "scroll",
  },
  noParkingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  noParkingText: {
    fontSize: 18,
    color: Colors.gray[700],
  },
});
