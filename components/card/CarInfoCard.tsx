import { useState } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import IconButton from "../button/IconButton";
import HeaderText from "../text/HeaderText";
import SubHeaderText from "../text/SubHeaderText";

import Colors from "@/constants/color";

export type CarInfoCardProps = {
  licensePlate: string;
  province: string;
  onPress: () => void;
  onDelete?: () => void;
};

const CarInfoCard: React.FC<CarInfoCardProps> = ({
  licensePlate,
  province,
  onPress,
  onDelete = () => {},
}) => {
  const [isSwiping, setSwiping] = useState<boolean>(false);
  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragAnimatedValue: Animated.AnimatedInterpolation<number>
  ) => {
    const opacity = dragAnimatedValue.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    return (
      <Animated.View style={[styles.deleteButton, { opacity }]}>
        <IconButton
          icon="trash-can-outline"
          size={25}
          color={Colors.white}
          onPress={onDelete}
        />
      </Animated.View>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      onSwipeableWillOpen={() => setSwiping(true)}
      onSwipeableClose={() => setSwiping(false)}
    >
      <View style={styles.container}>
        <Pressable
          android_ripple={{ color: Colors.gray[600] }}
          style={({ pressed }) => [pressed && styles.pressed]}
          onPress={() => !isSwiping && onPress()}
        >
          <View style={styles.innerContainer}>
            <View style={styles.infoContainer}>
              <HeaderText text={licensePlate} textStyle={styles.licenseText} />
              <SubHeaderText text={province} />
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color={Colors.gray[800]}
            />
          </View>
        </Pressable>
      </View>
    </Swipeable>
  );
};

export default CarInfoCard;

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
    padding: 10,
  },
  infoContainer: {},
  licenseText: {
    color: Colors.black,
  },
  pressed: {
    opacity: 0.5,
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.red[400],
    height: "100%",
    width: 100,
  },
});
