import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Colors from "../../constants/color";
import BodyText from "../text/BodyText";

export type RoleCardProps = {
  roleName: string;
  member: string;
  onPress: () => void;
};

const RoleCard: React.FC<RoleCardProps> = ({ roleName, member, onPress }) => {
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
        <View style={styles.contentWrapper}>
          <MaterialCommunityIcons
            name={"human-male-female-child"}
            size={20}
            color={Colors.gray[800]}
          />
          <View style={styles.textContainer}>
            <BodyText text={roleName} textStyle={{color: Colors.gray[900]}}/>
            <BodyText text={member + ' Member(s)'} textStyle={{color: Colors.gray[700]}}/>
          </View>
        </View>
        <MaterialCommunityIcons
          name={"chevron-right"}
          size={35}
          color={Colors.gray[800]}
          style={styles.icon}
        />
      </View>
    </Pressable>
  );
};

export default RoleCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    borderRadius: 8,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentWrapper: {
    flexDirection: "row",
    gap: 10,
  },
  textContainer: {
    gap: 3,
  },
  card: {},
  cardPressed: {
    opacity: 0.5,
  },
  text: {
    color: Colors.white,
  },
  icon: {
    marginRight: -10,
  }
});
