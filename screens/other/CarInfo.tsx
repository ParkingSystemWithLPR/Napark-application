import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import PrimaryButton from "@/components/button/PrimaryButton";
import CarInfoCard from "@/components/card/CarInfoCard";
import BodyText from "@/components/text/BodyText";
import SubHeaderText from "@/components/text/SubHeaderText";
import BodyContainer from "@/components/ui/BodyContainer";
import Colors from "@/constants/color";
import { ActionMode } from "@/enum/ActionMode";
import { useProfile } from "@/store/context/profile";
import { RootParamList } from "@/types";
import { Car } from "@/types/user";

export type CarInfoProps = NativeStackScreenProps<RootParamList, "CarInfo">;

const CarInfo: React.FC<CarInfoProps> = ({ navigation }) => {
  const { profile } = useProfile();
  const [cars, setCars] = useState<Car[]>([]);

  useLayoutEffect(() => {
    if (profile) {
      setCars(profile.user_car ?? []);
    }
  }, [profile]);

  const emptyCar = useCallback(() => {
    return (
      <View style={styles.emptyContainer}>
        <BodyText text="You haven't set up the car yet!" />
      </View>
    );
  }, []);

  const defaultCar = useCallback(() => {
    const car = cars.filter((car) => car.is_default);
    return (
      <View style={styles.defaultCarContainer}>
        <SubHeaderText text="Default" />
        {car.length > 0 ? (
          <CarInfoCard
            licensePlate={car[0].license_plate}
            province={car[0].province_of_reg}
            onPress={() => {
              navigation.navigate("CarInfoSetup", {
                mode: ActionMode.EDIT,
                carInfo: car[0],
              });
            }}
          />
        ) : (
          emptyCar()
        )}
      </View>
    );
  }, [cars]);

  const otherCars = useCallback(() => {
    const filteredCar = cars.filter((car) => !car.is_default);
    return (
      <View style={styles.otherCarsContainer}>
        <SubHeaderText text="Other cars" />
        {filteredCar.length > 0 ? (
          <FlatList
            data={filteredCar}
            renderItem={({ item }) => (
              <CarInfoCard
                licensePlate={item.license_plate}
                province={item.province_of_reg}
                onPress={() => {
                  navigation.navigate("CarInfoSetup", {
                    mode: ActionMode.EDIT,
                    carInfo: item,
                  });
                }}
              />
            )}
            keyExtractor={(item) => item.license_plate}
            overScrollMode="never"
          />
        ) : (
          emptyCar()
        )}
      </View>
    );
  }, [cars]);

  return (
    <BodyContainer>
      <View style={styles.container}>
        {defaultCar()}
        {otherCars()}
        <PrimaryButton
          title="+ Add new car"
          onPress={() =>
            navigation.navigate("CarInfoSetup", { mode: ActionMode.CREATE })
          }
        />
      </View>
    </BodyContainer>
  );
};

export default CarInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
    gap: 10,
  },
  defaultCarContainer: {
    gap: 5,
    borderBottomWidth: 1,
    borderColor: Colors.red[100],
    paddingBottom: 10,
  },
  otherCarsContainer: {
    flex: 1,
    gap: 5,
    marginVertical: 10,
  },
  emptyContainer: {
    marginVertical: 10,
  },
});
