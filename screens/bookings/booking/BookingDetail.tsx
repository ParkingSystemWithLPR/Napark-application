import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Alert, Platform } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import BookingCardSummary from "@/components/booking/BookingCardSummary";
import BookingDetailComponent from "@/components/booking/BookingDetailComponent";
import ParkingPlan from "@/components/booking/ParkingPlan";
import RecommendedSlotCard from "@/components/booking/RecommendSlotCard";
import BodyText from "@/components/text/BodyText";
import SubHeaderText from "@/components/text/SubHeaderText";
import BodyContainer from "@/components/ui/BodyContainer";
import Colors from "@/constants/color";
import { ValidateStatus } from "@/enum/BookingValidateStatus";
import { SlotType } from "@/enum/SlotType";
import {
  GetAvailableSlotsQueryParam,
  useGetAvailableSlot,
} from "@/store/api/booking/useGetAvailableSlot";
import { useAuth } from "@/store/context/auth";
import { useProfile } from "@/store/context/profile";
import { AuthenticatedStackParamList, BookingsStackParamList } from "@/types";
import {
  AvailableSlotResponse,
  SlotProfileWithPrivilege,
} from "@/types/booking";
import {
  defaultBookingDetailState,
  getQueryParamFromBookingDetailState,
  validateTimeInputs,
  validateLicensePlate,
  validateAfterClosingSetting,
  createDefaultBookingDetailState,
} from "@/utils/bookingRequest";
import { formatHumanReadableDateFromDateString } from "@/utils/date";

export type BookingDetailState = {
  carId: string;
  checkInDate: string | null;
  checkInTime: string | null;
  checkOutDate: string | null;
  checkOutTime: string | null;
  specification: SlotType;
  floor: number | null;
  slotId: string;
  slotName: string;
  price: number;
  unit: string;
};

export type BookingDetailProps = CompositeScreenProps<
  NativeStackScreenProps<BookingsStackParamList, "BookingDetail">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const BookingDetail: React.FC<BookingDetailProps> = ({ navigation, route }) => {
  const parkingLot = route.params.parkingLot;
  const { accessToken, authenticate } = useAuth();
  const { profile } = useProfile();
  const [goToNextPage, setGoToNextPage] = useState(false);
  const [isSetting, setIsSetting] = useState(true);
  const defaultValue = route.params.defaultValue
    ? route.params.defaultValue
    : createDefaultBookingDetailState(profile);
  const [bookingDetailState, setBookingDetailState] =
    useState<BookingDetailState>(defaultValue);

  const [availableSlotQueryParam, setAvailableSlotQueryParam] =
    useState<GetAvailableSlotsQueryParam>(
      getQueryParamFromBookingDetailState(bookingDetailState, parkingLot)
    );

  const getAvailableSlot = useGetAvailableSlot({
    queryParams: availableSlotQueryParam,
    auth: { accessToken, authenticate },
  });

  const [availableSlot, setAvailableSlot] = useState<AvailableSlotResponse>({
    available_slots: [],
    recommended_slots: null,
  });

  const handleOnChange = function <T>(
    identifierKey: string,
    enteredValue: T
  ): void {
    setBookingDetailState((curInputValue: BookingDetailState) => {
      return {
        ...curInputValue,
        [identifierKey]: enteredValue,
      };
    });
  };
  const resetSlotInBookingDetailState = () => {
    const { slotId, slotName, price, unit, floor } = defaultBookingDetailState;
    handleOnChange("slotId", slotId);
    handleOnChange("slotName", slotName);
    handleOnChange("price", price);
    handleOnChange("unit", unit);
    handleOnChange("floor", floor);
  };
  const openSetting = () => {
    resetSlotInBookingDetailState();
    setIsSetting(true);
  };

  const closeSetting = () => {
    const isTimesValid = timeValidator();
    const isLicensePlateValid = licensePlateValidator();
    if (isTimesValid && isLicensePlateValid) {
      setIsSetting(false);
    }
  };

  const handleNavigation = () => {
    setGoToNextPage(true);
  };

  const handleClickRecommend = (slot: SlotProfileWithPrivilege) => {
    handleOnChange("slotId", slot._id);
    handleOnChange("slotName", slot.name);
    handleOnChange(
      "price",
      slot.is_privilege_available
        ? slot.privilege_price_rate
        : slot.default_price_rate
    );
    handleOnChange(
      "unit",
      slot.is_privilege_available
        ? slot.privilege_price_unit
        : slot.default_price_rate_unit
    );
    handleNavigation();
  };

  const timeValidator = () => {
    const status = validateTimeInputs(bookingDetailState);
    switch (status) {
      case ValidateStatus.SUCCESS:
        return true;
      case ValidateStatus.MISSING:
        Alert.alert("Please fill all required fill");
        return false;
      case ValidateStatus.TIMEOUT:
        Alert.alert(
          "Invalid booking time",
          "CheckIn or CheckOut Time is before current time"
        );
        setBookingDetailState(defaultBookingDetailState);
        setIsSetting(true);
        return false;
    }
  };

  const licensePlateValidator = () => {
    const status = validateLicensePlate(bookingDetailState);
    switch (status) {
      case ValidateStatus.SUCCESS:
        return true;
      case ValidateStatus.MISSING:
        Alert.alert("Please fill all required fill");
        return false;
    }
  };

  useLayoutEffect(() => {
    if (goToNextPage) {
      const isTimeValid = timeValidator();
      const isLicensePlateValid = licensePlateValidator();
      const isOtherValid =
        validateAfterClosingSetting(bookingDetailState) ==
        ValidateStatus.SUCCESS;
      if (isTimeValid && isLicensePlateValid && isOtherValid) {
        navigation.navigate("BookingSummary", {
          bookingDetailState: bookingDetailState,
          parkingLot: parkingLot,
        });
      }
    }
    setGoToNextPage(false);
  }, [goToNextPage]);

  useLayoutEffect(() => {
    if (!isSetting) {
      const queryParams = getQueryParamFromBookingDetailState(
        bookingDetailState,
        parkingLot
      );
      setAvailableSlotQueryParam(queryParams);
    }
  }, [isSetting]);

  useLayoutEffect(() => {
    if (getAvailableSlot.isSuccess) {
      if (getAvailableSlot.data.recommended_slots) {
        setAvailableSlot(getAvailableSlot.data);
      } else {
        Alert.alert(
          "No Available Slot from the selected duration or specification"
        );
        setIsSetting(true);
      }
    }
  }, [getAvailableSlot.data]);

  return (
    <BodyContainer innerContainerStyle={styles.screen}>
      <View style={styles.bookingDetailContainer}>
        <View style={styles.locationContainer}>
          <BodyText
            text={parkingLot.name}
            ellipsizeMode="tail"
            numberOfLines={1}
            containerStyle={styles.locationTextContainer}
          />
          <MaterialIcons name="location-pin" size={30} style={styles.pin} />
        </View>
        {isSetting ? (
          <View style={styles.bookingDetailComponentContainer}>
            <BookingDetailComponent
              bookingDetailState={bookingDetailState}
              onChange={handleOnChange}
              closeSetting={closeSetting}
              parkingLot={parkingLot}
            />
          </View>
        ) : (
          <BookingCardSummary
            checkIn={
              bookingDetailState.checkInDate && bookingDetailState.checkInTime
                ? `${formatHumanReadableDateFromDateString(
                    bookingDetailState.checkInDate
                  )} ${bookingDetailState.checkInTime}`
                : ""
            }
            specification={bookingDetailState.specification}
            openSetting={openSetting}
          />
        )}
      </View>
      {!isSetting &&
        availableSlot.recommended_slots &&
        availableSlot.available_slots.length != 0 && (
          <View style={styles.scrollViewContainer}>
            <ScrollView>
              <View style={styles.scrollViewContent}>
                <SubHeaderText
                  text={"Recommended Slot"}
                  containerStyle={styles.header}
                />
                <View style={styles.recommendSlotOuterContainer}>
                  <RecommendedSlotCard
                    slot={availableSlot.recommended_slots}
                    recommendType={"Cheapest slot"}
                    handleClickRecommend={handleClickRecommend}
                  />
                </View>
                <SubHeaderText
                  text={"View All Available Slot"}
                  containerStyle={{ marginVertical: 10 }}
                />
                <ParkingPlan
                  bookingDetailState={bookingDetailState}
                  availableSlot={availableSlot.available_slots}
                  onChange={handleOnChange}
                  handleConfirm={handleNavigation}
                  floorImages={parkingLot.floor_images}
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
    paddingVertical: 10,
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
  locationTextContainer: { flex: 1, marginHorizontal: 5 },
  pin: { color: Colors.red[300] },
  bookingDetailComponentContainer: { flex: 1 },
  scrollViewContainer: { flex: 4 },
  header: { marginBottom: 10 },
  recommendSlotOuterContainer: {
    flex: 1,
    gap: Platform.OS == "ios" ? 25 : 20,
    marginBottom: 10,
  },
  scrollViewContent: { marginBottom: 100 },
});
