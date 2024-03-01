import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import PrimaryButton from "../../components/button/PrimaryButton";
import ParkingSpaceCard from "../../components/card/ParkingSpaceCard";
import HeaderText from "../../components/text/HeaderText";
import BodyContainer from "../../components/ui/BodyContainer";
import Colors from "../../constants/color";
import { useGetParkingLotsByUserId } from "../../store/api/useGetParkingLotsByUserId";
import { RootParamList } from "../../types";
import { ParkingLot } from "../../types/parking-lot/ParkingLot";

export type ParkingLotsListProps = NativeStackScreenProps<
  RootParamList,
  "ParkingLotsList"
>;

const ParkingLotsList: React.FC<ParkingLotsListProps> = ({ navigation }) => {
  const [parkingLots, setParkingLots] = useState<ParkingLot[]>([]);

  const getParkingLots = useGetParkingLotsByUserId("65d76b018143af9faf0283fd");

  useEffect(() => {
    if(getParkingLots.data) {
      setParkingLots(getParkingLots.data);
    }
  }, [getParkingLots.data])

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
                businessHours={"08:00 - 23:59"}
                availabilty={0}
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
