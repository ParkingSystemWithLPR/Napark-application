import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { View, StyleSheet, ScrollView, Alert, Pressable } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import BookingCardSummary from "../../components/booking/BookingCardSummary";
import BookingDetailComponent from "../../components/booking/BookingDetailComponent";
import ParkingPlan from "../../components/booking/ParkingPlan";
import BodyText from "../../components/text/BodyText";
import SubHeaderText from "../../components/text/SubHeaderText";
import BodyContainer from "../../components/ui/BodyContainer";
import Colors from "../../constants/color";
import { RootParamList } from "../../types";

export type BookingDetailProps = NativeStackScreenProps<
  RootParamList,
  "BookingDetail"
>;
type RecommendedSlotType = {
  slotName: string;
  recommendType: string;
  price: number;
  unit: string;
};
export type BookingRequest = {
  licensePlate: string;
  checkInDate: string | null;
  checkInTime: string | null;
  checkOutDate: string | null;
  checkOutTime: string | null;
  specification: string;
  floor: string;
  slot: string;
  price: number;
  unit: string;
};
const BookingDetail: React.FC<BookingDetailProps> = ({ navigation }) => {
  const [isSetting, setIsSetting] = useState(true);
  const [bookingRequest, setBookingRequest] = useState<BookingRequest>({
    licensePlate: "",
    checkInDate: null,
    checkInTime: null,
    checkOutDate: null,
    checkOutTime: null,
    specification: "None",
    floor: "",
    slot: "",
    price: 0,
    unit: "",
  });
  const handleOnChange = function <T>(
    identifierKey: string,
    enteredValue: T
  ): void {
    setBookingRequest((curInputValue: BookingRequest) => {
      return {
        ...curInputValue,
        [identifierKey]: enteredValue,
      };
    });
  };

  const openSetting = () => {
    setIsSetting(true);
  };
  const closeSetting = () => {
    if (
      bookingRequest.licensePlate == "" ||
      !bookingRequest.checkInDate ||
      !bookingRequest.checkInTime ||
      !bookingRequest.checkOutTime ||
      !bookingRequest.checkOutDate
    ) {
      Alert.alert("Please fill all required fill");
    } else {
      setIsSetting(false);
    }
  };
  const handleNavigation = () => {
    navigation.navigate("BookingSummary", { bookingRequest: bookingRequest });
  };
  const handleClickRecommend = (slot: RecommendedSlotType) => {
    console.log(slot.slotName);
    handleOnChange("slot", slot.slotName);
    handleOnChange("price", slot.price);
    handleOnChange("unit", slot.unit);
    handleNavigation();
  };
  const RecommendedSlot: React.FC<RecommendedSlotType> = ({
    slotName,
    recommendType,
    price,
    unit,
  }) => {
    return (
      <Pressable
        onPress={handleClickRecommend.bind(this, {
          slotName,
          recommendType,
          price,
          unit,
        })}
      >
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
          <BodyText text={price.toString() + unit}></BodyText>
        </View>
      </Pressable>
    );
  };
  return (
    <BodyContainer innerContainerStyle={styles.screen}>
      <View style={styles.bookingDetailContainer}>
        <View style={styles.locationContainer}>
          <BodyText text={"Engineer building 3, Chulalongkorn"} />
          <MaterialIcons name="location-pin" size={30} style={styles.pin} />
        </View>
        {isSetting ? (
          <View style={styles.bookingDetailComponentContainer}>
            <BookingDetailComponent
              licensePlate={bookingRequest.licensePlate}
              setLicensePlate={(value: string) =>
                handleOnChange("licensePlate", value)
              }
              checkInDate={bookingRequest.checkInDate}
              setCheckInDate={(value: string | null) =>
                handleOnChange("checkInDate", value)
              }
              checkInTime={bookingRequest.checkInTime}
              setCheckInTime={(value: string | null) =>
                handleOnChange("checkInTime", value)
              }
              specification={bookingRequest.specification}
              setSpecification={(value: string | undefined) =>
                handleOnChange("specification", value)
              }
              closeSetting={closeSetting}
              checkOutTime={bookingRequest.checkOutTime}
              setCheckOutTime={(value: string | null) =>
                handleOnChange("checkOutTime", value)
              }
              checkOutDate={bookingRequest.checkOutDate}
              setCheckOutDate={(value: string | null) =>
                handleOnChange("checkOutDate", value)
              }
            />
          </View>
        ) : (
          <BookingCardSummary
            checkInDate={bookingRequest.checkInDate ?? ""}
            checkInTime={bookingRequest.checkInTime ?? ""}
            specification={bookingRequest.specification}
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
                  price={1}
                  unit="฿/hr"
                />
                <RecommendedSlot
                  slotName={"8B"}
                  recommendType={"Nearest to the entrance"}
                  price={1.5}
                  unit="฿/hr"
                />
              </View>
              <SubHeaderText
                text={"View All Slot"}
                containerStyle={{ marginVertical: 10 }}
              />
              <ParkingPlan
                floor={bookingRequest.floor}
                setFloor={(value: string) => handleOnChange("floor", value)}
                slot={bookingRequest.slot}
                setSlot={(value: string) => handleOnChange("slot", value)}
                handleConfirm={handleNavigation}
                setPrice={(value: number) => handleOnChange("price", value)}
                setUnit={(value: string) => handleOnChange("unit", value)}
              />
            </View>
          </ScrollView>
        </View>
      )}
    </BodyContainer>
  );
};
export default BookingDetail;

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 20,
    gap: 20,
  },
  bookingDetailContainer: { flex: 2 },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: Colors.white,
    justifyContent: "space-around",
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderRadius: 5,
    paddingVertical: 10,
  },
  pin: { color: Colors.red[300], fontSize: 30 },
  bookingDetailComponentContainer: { flex: 1 },
  scrollViewContainer: { flex: 4 },
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
