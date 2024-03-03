import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import PrimaryButton from "@/components/button/PrimaryButton";
import ParkingSpaceCard from "@/components/card/ParkingSpaceCard";
import HeaderText from "@/components/text/HeaderText";
import BodyContainer from "@/components/ui/BodyContainer";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import Colors from "@/constants/color";
import { useGetParkingLotsByUserId } from "@/store/api/parking-lot/useGetParkingLotsByUserId";
import { useAuth } from "@/store/context/auth";
import { RootParamList } from "@/types";
import { ParkingLot } from "@/types/parking-lot/ParkingLot";

export type ParkingLotsListProps = NativeStackScreenProps<
  RootParamList,
  "ParkingLotsList"
>;

const ParkingLotsList: React.FC<ParkingLotsListProps> = ({ navigation }) => {
  const { accessToken, authenticate } = useAuth();
  const [parkingLots, setParkingLots] = useState<ParkingLot[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  const getParkingLots = useGetParkingLotsByUserId({
    queryParams: { userId: "65d76b018143af9faf0283fd" },
    auth: { accessToken, authenticate },
  });

  useEffect(() => {
    if (getParkingLots.data) {
      setParkingLots(getParkingLots.data);
      setLoading(false);
    }
  }, [getParkingLots.data]);

  if (isLoading) return <LoadingOverlay message={"Loading..."} />;

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
        parkingLots.length !== 0
          ? styles.bodyContainer
          : styles.bodyContainerNoParking
      }
    >
      {parkingLots.length !== 0 ? (
        <View style={styles.parkingSpaceCardContainer}>
          <FlatList
            data={[...parkingLots]}
            renderItem={({ item }) => (
              <ParkingSpaceCard
                parkingSpaceName={item.name}
                businessHours={"08:00 - 23:59"}
                availabilty={0}
                onPress={() =>
                  navigation.push("OtherStack", { screen: "ParkingLotDetail" })
                }
              />
            )}
            overScrollMode="never"
          />
        </View>
      ) : (
        <NoParkingLot></NoParkingLot>
      )}
      <PrimaryButton
        title="Request for your parking space"
        onPress={() =>
          navigation.push("OtherStack", { screen: "RequestParkingLot" })
        }
      />
    </BodyContainer>
  );
};

export default ParkingLotsList;

const styles = StyleSheet.create({
  bodyContainer: {
    gap: 20,
    justifyContent: "space-between",
    paddingVertical: 50,
  },
  bodyContainerNoParking: {
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  parkingSpaceCardContainer: {
    flex: 1,
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
