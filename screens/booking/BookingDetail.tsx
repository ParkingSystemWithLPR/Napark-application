import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableHighlight,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import BookingCardSummary from "../../components/booking/BookingCardSummary";
import BookingDetailComponent from "../../components/booking/BookingDetailComponent";
import ParkingPlan from "../../components/booking/ParkingPlan";
import BodyText from "../../components/text/BodyText";
import SubHeaderText from "../../components/text/SubHeaderText";
import Colors from "../../constants/color";
import { RootParamList } from "../../types";

export type BookingDetailProps = NativeStackScreenProps<
  RootParamList,
  "BookingDetail"
>;
type RecommendedSlotType = {
  slotName: string;
  recommendType: string;
  price: string;
};
const BookingDetail: React.FC<BookingDetailProps> = ({ navigation }) => {
  const [duration, setDuration] = useState([0]);
  const [licensePlate, setLicensePlate] = useState<string>("");
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | undefined>("None");
  const [isSetting, setIsSetting] = useState(true);
  const [floor, setfloor] = useState<string>("");
  const [slot, setSlot] = useState<string>("");
  const openSetting = () => {
    setIsSetting(true);
  };
  const closeSetting = () => {
    if (licensePlate == "" || !date || !time || duration[0] == 0) {
      Alert.alert("Please fill all required fill");
    } else {
      setIsSetting(false);
    }
  };
  const handleNavigation = () => {
    navigation.navigate("MainScreen");
  };
  const RecommendedSlot: React.FC<RecommendedSlotType> = ({
    slotName,
    recommendType,
    price,
  }) => {
    return (
      <TouchableHighlight onPress={handleNavigation}>
        <View style={styles.recommendSlotContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.parkingOutline}>
              <MaterialCommunityIcons
                name="parking"
                style={styles.iconParking}
              />
            </View>
            <View>
              <BodyText text={"Slot: " + slotName}></BodyText>
              <BodyText text={recommendType}></BodyText>
            </View>
          </View>
          <BodyText text={price}></BodyText>
        </View>
      </TouchableHighlight>
    );
  };
  return (
    <View style={styles.screen}>
      <View style={styles.bookingDetailContainer}>
        <View style={styles.locationContainer}>
          <BodyText text={"Engineer building 3, Chulalongkorn"} />
          <Ionicons name="location-sharp" style={styles.icon} />
        </View>
        {isSetting ? (
          <View style={styles.bookingDetailComponentContainer}>
            <BookingDetailComponent
              date={date}
              setDate={setDate}
              licensePlate={licensePlate}
              setLicensePlate={setLicensePlate}
              duration={duration}
              setDuration={setDuration}
              time={time}
              setTime={setTime}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              closeSetting={closeSetting}
            />
          </View>
        ) : (
          <BookingCardSummary
            checkInDateTime={(date ?? "") + " " + time}
            specification={selectedId}
            openSetting={openSetting}
          />
        )}
      </View>
      {!isSetting && (
        <View style={styles.scrollViewContainer}>
          <ScrollView>
            <View style={styles.scrollViewContent}>
              <SubHeaderText
                text={"Recommended Slot"}
                containerStyle={styles.header}
              />
              <View style={styles.recommendSlotOuterContainer}>
                <RecommendedSlot
                  slotName={"6A"}
                  recommendType={"Cheapest slot"}
                  price={"1 $ / hour"}
                />
                <RecommendedSlot
                  slotName={"8B"}
                  recommendType={"Nearest to the entrance"}
                  price={"1.5 $ /hour"}
                />
              </View>
              <SubHeaderText
                text={"View All Slot"}
                containerStyle={{ marginVertical: 10 }}
              />
              <ParkingPlan
                floor={floor}
                setFloor={setfloor}
                slot={slot}
                setSlot={setSlot}
                handleConfirm={handleNavigation}
              />
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};
export default BookingDetail;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 20,
  },
  bookingDetailContainer: { flex: 2 },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
    backgroundColor: Colors.white,
    justifyContent: "space-around",
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderRadius: 5,
    paddingVertical: 10,
  },
  icon: { color: Colors.red[300], fontSize: 30 },
  bookingDetailComponentContainer: { flex: 1 },
  scrollViewContainer: { flex: 3 },
  header: { marginBottom: 10 },
  recommendSlotOuterContainer: {
    flex: 1,
    gap: 20,
    marginBottom: 10,
  },
  recommendSlotContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 8,
    borderBottomWidth: 1,
  },
  parkingOutline: {
    borderRadius: 100,
    borderWidth: 1,
    alignSelf: "baseline",
    marginRight: 10,
  },
  iconParking: { fontSize: 15 },
  rowContainer: { flexDirection: "row" },
  scrollViewContent: { marginBottom: 100 },
});
