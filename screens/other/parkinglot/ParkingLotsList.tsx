import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import PrimaryButton from "@/components/button/PrimaryButton";
import ParkingSpaceCard from "@/components/card/ParkingSpaceCard";
import HeaderText from "@/components/text/HeaderText";
import BodyContainer from "@/components/ui/BodyContainer";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import Colors from "@/constants/color";
import { useGetMyParkingLots } from "@/store/api/parking-lot/useGetMyParkingLots";
import { useAuth } from "@/store/context/auth";
import { OtherStackParamList, AuthenticatedStackParamList } from "@/types";
import { ParkingLot } from "@/types/parking-lot";
import { getBusinessHours, getDayInAWeek } from "@/utils/date";

export type ParkingLotsListProps = CompositeScreenProps<
  NativeStackScreenProps<OtherStackParamList, "ParkingLotsList">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const ParkingLotsList: React.FC<ParkingLotsListProps> = ({ navigation }) => {
  const { accessToken, authenticate } = useAuth();
  const [parkingLots, setParkingLots] = useState<ParkingLot[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);

  const getParkingLots = useGetMyParkingLots({
    auth: { accessToken, authenticate },
  });

  useEffect(() => {
    if (getParkingLots.isSuccess) {
      setParkingLots(getParkingLots.data);
      setLoading(false);
    }
  }, [getParkingLots.data]);

  const refreshRequest = useCallback(async () => {
    await getParkingLots.refetch();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshRequest();
    setRefreshing(false);
  }, []);

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
    <BodyContainer innerContainerStyle={{ flex: 1 }}>
      {parkingLots.length !== 0 ? (
        <View style={styles.bodyContainer}>
          <View style={styles.parkingSpaceCardContainer}>
            <FlatList
              data={parkingLots}
              renderItem={({ item }) => {
                const businessDay = item.business_days.find((businessday) => {
                  businessday.weekday == getDayInAWeek(new Date());
                });
                return (
                  <ParkingSpaceCard
                    parkingSpaceName={item.name}
                    parkingImage={item.images[0]}
                    businessHours={
                      businessDay
                        ? getBusinessHours(businessDay)
                        : "Not available"
                    }
                    availabilty={0}
                    onPress={() =>
                      navigation.navigate("ParkingLotDetail", {
                        parkingLotId: item._id,
                      })
                    }
                  />
                );
              }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              overScrollMode="never"
            />
          </View>
          <PrimaryButton
            title="Request for your parking space"
            onPress={() => navigation.navigate("RequestParkingLot")}
          />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.bodyContainerNoParking}
        >
          <NoParkingLot></NoParkingLot>
          <PrimaryButton
            title="Request for your parking space"
            onPress={() => navigation.navigate("RequestParkingLot")}
          />
        </ScrollView>
      )}
    </BodyContainer>
  );
};

export default ParkingLotsList;

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    gap: 20,
    justifyContent: "space-between",
    paddingBottom: 25,
  },
  bodyContainerNoParking: {
    flex: 1,
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
