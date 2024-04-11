import { View, Pressable, StyleSheet, Platform } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BodyText from "../text/BodyText";
import Colors from "@/constants/color";
import { Slot } from "@/types/booking";

export type RecommendedSlotType = {
  slot: Slot;
  recommendType: string;
  handleClickRecommend: (slot: Slot) => void;
};

const RecommendedSlotCard: React.FC<RecommendedSlotType> = ({
  slot,
  recommendType,
  handleClickRecommend,
}) => {
  const price = slot.is_privilege_available
    ? slot.privilege_price_rate
    : slot.default_price_rate;
  const unit = slot.is_privilege_available
    ? slot.privilege_price_unit
    : slot.default_price_rate_unit;
  return (
    <View style={styles.recommendSlotContainer}>
      <Pressable
        onPress={handleClickRecommend.bind(this, slot)}
        style={({ pressed }) => [pressed && styles.pressed]}
      >
        <View style={styles.recommendSlot}>
          <View style={styles.rowContainer}>
            <MaterialCommunityIcons
              name="alpha-p-circle-outline"
              style={styles.iconParking}
              size={20}
            />
            <View
              style={{
                gap: 5,
              }}
            >
              <BodyText text={`Slot: ${slot.name}`}></BodyText>
              <BodyText text={recommendType}></BodyText>
            </View>
          </View>
          <BodyText text={`${price} ${unit}`}></BodyText>
        </View>
      </Pressable>
    </View>
  );
};
export default RecommendedSlotCard;

const styles = StyleSheet.create({
  pressed: { opacity: 0.5 },

  recommendSlotOuterContainer: {
    flex: 1,
    gap: Platform.OS == "ios" ? 25 : 20,
    marginBottom: 10,
  },
  recommendSlot: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recommendSlotContainer: {
    marginHorizontal: 5,
    backgroundColor: Colors.white,
    padding: 10,
    shadowColor: Colors.black,
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  iconParking: { marginRight: 10 },
  rowContainer: { flexDirection: "row" },
});
