import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import BodyText from "../text/BodyText";

import Colors from "@/constants/color";
import { ManagingCategory } from "@/enum/ManagingCategory";

export type RoleCardProps = {
  category: ManagingCategory;
  roleName: string;
  description?: string;
  member?: number;
  onPress: () => void;
  disabled?: boolean;
};

const RoleCard: React.FC<RoleCardProps> = ({
  category,
  roleName,
  description,
  member = 0,
  onPress,
  disabled = false,
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
        disabled={disabled}
      >
        <View style={styles.innerContainer}>
          <View style={styles.contentWrapper}>
            <MaterialCommunityIcons
              name={
                category === ManagingCategory.PRIVILEGE
                  ? "account-star"
                  : "account-supervisor"
              }
              size={20}
              color={Colors.gray[800]}
            />
            <View style={styles.textContainer}>
              <BodyText
                text={roleName}
                textStyle={{ color: Colors.gray[900] }}
              />
              <BodyText
                text={!!description ? description : `${member} ${"Member(s)"}`}
                textStyle={{ color: Colors.gray[700] }}
              />
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
    </View>
  );
};

export default RoleCard;

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
  },
  innerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
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
  },
});
