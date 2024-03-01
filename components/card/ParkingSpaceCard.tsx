import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Colors from "../../constants/color";
import BodyText from "../text/BodyText";
import SubHeaderText from "../text/SubHeaderText";

export type ParkingSpaceCardProps = {
  parkingSpaceName: string;
  businessHours: string;
  availabilty: number;
  onPress: () => void;
};

const ParkingSpaceCard: React.FC<ParkingSpaceCardProps> = ({
  parkingSpaceName,
  businessHours,
  availabilty,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{ color: Colors.gray[600] }}
        style={({ pressed }) => [
          styles.card,
          pressed ? styles.cardPressed : null,
        ]}
        onPress={onPress}
      >
        <View style={styles.innerContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/images/icon.png")}
          />
          <View style={styles.textContainer}>
            <View style={styles.descriptionWrapper}>
              <SubHeaderText text={parkingSpaceName} />
            </View>
            <View style={styles.descriptionWrapper}>
              <MaterialCommunityIcons
                name={"clock"}
                size={20}
                color={Colors.gray[800]}
                style={styles.icon}
              />
              <BodyText text={businessHours} />
            </View>
            <View style={styles.descriptionWrapper}>
              <MaterialCommunityIcons
                name={"car"}
                size={20}
                color={Colors.gray[800]}
                style={styles.icon}
              />
              <BodyText text={availabilty + " slot left!!"} />
            </View>
          </View>
          <MaterialCommunityIcons
            name={"chevron-right"}
            size={30}
            color={Colors.gray[800]}
            style={styles.icon}
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  image: {
    borderRadius: 8,
    width: 80,
    height: 80,
    backgroundColor: Colors.gray[100],
  },
  textContainer: {
    gap: 5,
  },
  descriptionWrapper: {
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
    gap: 10,
  },
  card: {},
  cardPressed: {
    opacity: 0.5,
  },
  text: {
    color: Colors.white,
  },
  icon: {},
});

