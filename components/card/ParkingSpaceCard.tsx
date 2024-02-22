import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import Colors from "../../constants/color";
import SubHeaderText from "../text/SubHeaderText";
import BodyText from "../text/BodyText";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export type ParkingSpaceCardProps = {
  parkingSpaceName: string;
  businessHours: string;
  availabilty: number;
  onPress:() => void;
}


const ParkingSpaceCard: React.FC<ParkingSpaceCardProps> = ({
  parkingSpaceName,
  businessHours,
  availabilty,
  onPress,
}) => {

  const handleOnParkingSpaceCardPress = () => {
    navigator
  }

  return (
    <Pressable
      android_ripple={{ color: Colors.gray[600] }}
      style={({ pressed }) => [
        styles.card,
        pressed ? styles.cardPressed : null,
      ]}
      onPress={onPress}
    >
      <View style={styles.cardContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/images/icon.png')}
        />
        <View style={styles.textContainer}>
          <View style={styles.descriptionWrapper}>
            <SubHeaderText text={parkingSpaceName}/>  
          </View>
          <View style={styles.descriptionWrapper}>
            <MaterialCommunityIcons
              name={"clock"}
              size={20}
              color={Colors.gray[800]}
              style={styles.icon}
            />
            <BodyText text={businessHours}/>
          </View>
          <View style={styles.descriptionWrapper}>
            <MaterialCommunityIcons
              name={"car"}
              size={20}
              color={Colors.gray[800]}
              style={styles.icon}
            />
            <BodyText text={availabilty.toString() + ' slot left!!'}/>
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
  );
};

export default ParkingSpaceCard;

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: Colors.gray[500],
    backgroundColor: Colors.gray[100],
    width: 300,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    gap: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    borderRadius: 8,
    width: 80,
    height: 80,
    backgroundColor: Colors.gray[100],
  },
  textContainer: {
    width: 154,
    gap: 5,
  },
  descriptionWrapper: {
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
    gap: 10,
    width: 154,
  },
  card: {},
  cardPressed: {
    opacity: 0.5,
  },
  text: {
    color: Colors.white,
  },
  icon: {

  }
});
