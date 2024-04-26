import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import BodyText from "../text/BodyText";
import DetailText from "../text/DetailText";

import Colors from "@/constants/color";

export type ParkingSpaceCardProps = {
  parkingSpaceName: string;
  parkingImage: string;
  businessHours: string;
  availabilty: number;
  onPress: () => void;
};

const ParkingSpaceCard: React.FC<ParkingSpaceCardProps> = ({
  parkingSpaceName,
  parkingImage,
  businessHours,
  availabilty,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{ color: Colors.gray[600] }}
        style={({ pressed }) => [pressed ? styles.cardPressed : null]}
        onPress={onPress}
      >
        <View style={styles.innerContainer}>
          <Image
            style={styles.image}
            source={{ uri: parkingImage }}
          />
          <View style={styles.textContainer}>
            <BodyText
              text={parkingSpaceName}
              textStyle={{ flexWrap: "wrap" }}
            />
            <View style={styles.descriptionWrapper}>
              <MaterialCommunityIcons
                name={"clock-outline"}
                size={20}
                color={Colors.gray[800]}
              />
              <DetailText text={businessHours} />
            </View>
            <View style={styles.descriptionWrapper}>
              <MaterialCommunityIcons
                name={"car-side"}
                size={20}
                color={Colors.gray[800]}
              />
              <DetailText text={availabilty + " slot left!!"} />
            </View>
          </View>
          <MaterialCommunityIcons
            name={"chevron-right"}
            size={30}
            color={Colors.gray[800]}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default ParkingSpaceCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  innerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  image: {
    borderRadius: 8,
    width: 80,
    height: 80,
  },
  textContainer: {
    flex: 1,
  },
  descriptionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cardPressed: {
    opacity: 0.5,
  },
});
