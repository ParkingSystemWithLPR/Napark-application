import { CompositeScreenProps, useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useLayoutEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
  Platform,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import BookingCardSummary from "@/components/booking/BookingCardSummary";
import BookingDetailComponent from "@/components/booking/BookingDetailComponent";
import ParkingPlan from "@/components/booking/ParkingPlan";
import BodyText from "@/components/text/BodyText";
import SubHeaderText from "@/components/text/SubHeaderText";
import BodyContainer from "@/components/ui/BodyContainer";
import Colors from "@/constants/color";
import { useProfile } from "@/store/context/profile";
import { AuthenticatedStackParamList, BookingStackParamList } from "@/types";
import { formatHumanReadableDateFromDateString } from "@/utils/date";
import RecommendedSlotCard from "@/components/booking/RecommendSlotCard";
import {
  defaultBookingRequest,
  validateAfterClosingSetting,
  validateLicensePlate,
  validateTimeInputs,
} from "@/utils/bookingRequest";
import { ValidateStatus } from "@/enum/BookingValidateStatus";

export type BookingDetailProps = CompositeScreenProps<
  NativeStackScreenProps<BookingStackParamList, "BookingDetail">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

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
const BookingDetail: React.FC<BookingDetailProps> = ({ navigation, route }) => {
  const parkingLot = route.params.parkingLot;
  const { profile } = useProfile();
  const isFocused = useIsFocused();
  const [goToNextPage, setGoToNextPage] = useState(false);
  const [isSetting, setIsSetting] = useState(true);

  const defaultLicensePlate = profile.user_car
    ?.filter((car) => car.is_default)
    .map((defaultcar) => defaultcar.license_plate)[0];

  const [bookingRequest, setBookingRequest] = useState<BookingRequest>({
    ...defaultBookingRequest,
    licensePlate: defaultLicensePlate ?? "",
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
  const timeValidator = () => {
    const status = validateTimeInputs(bookingRequest);
    switch (status) {
      case ValidateStatus.SUCCESS:
        return true;
      case ValidateStatus.MISSING:
        Alert.alert("Please fill all required fill");
        return false;
      case ValidateStatus.TIMEOUT:
        Alert.alert("CheckIn or CheckOut timeout");
        setBookingRequest(defaultBookingRequest);
        setIsSetting(true);
        return false;
    }
  };

  const licensePlateValidator = () => {
    const status = validateLicensePlate(bookingRequest);
    switch (status) {
      case ValidateStatus.SUCCESS:
        return true;
      case ValidateStatus.MISSING:
        Alert.alert("Please fill all required fill");
        return false;
    }
  };

  const closeSetting = () => {
    const isTimesValid = timeValidator();
    const isLicensePlateValid = licensePlateValidator();
    if (isTimesValid && isLicensePlateValid) {
      setIsSetting(false);
    }
  };

  const handleNavigation = () => {
    const isTimeValid = timeValidator();
    const isLicensePlateValid = licensePlateValidator();
    const isOtherValid =
      validateAfterClosingSetting(bookingRequest) == ValidateStatus.SUCCESS;
    if (isTimeValid && isLicensePlateValid && isOtherValid)
      setGoToNextPage(true);
  };

  const handleClickRecommend = (
    slotName: string,
    price: number,
    unit: string
  ) => {
    handleOnChange("slot", slotName);
    handleOnChange("price", price);
    handleOnChange("unit", unit);
    handleNavigation();
  };

  useLayoutEffect(() => {
    goToNextPage &&
      navigation.navigate("BookingSummary", {
        bookingRequest: bookingRequest,
        parkingLot: parkingLot,
      });
    setGoToNextPage(false);
  }, [goToNextPage]);

  useLayoutEffect(() => {
    isFocused && setBookingRequest(bookingRequest); //refresh screen
  }, [isFocused]);

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
              licensePlate={bookingRequest.licensePlate}
              setLicensePlate={(value: string) => {
                handleOnChange("licensePlate", value);
              }}
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
              bussinessDays={parkingLot.businessDays}
            />
          </View>
        ) : (
          <BookingCardSummary
            checkIn={
              bookingRequest.checkInDate && bookingRequest.checkInTime
                ? `${formatHumanReadableDateFromDateString(
                    bookingRequest.checkInDate
                  )} ${bookingRequest.checkInTime}`
                : ""
            }
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
                <RecommendedSlotCard
                  slotName={"6A"}
                  recommendType={"Cheapest slot"}
                  price={20}
                  unit={"Baht/hr"}
                  handleClickRecommend={handleClickRecommend}
                />
                <RecommendedSlotCard
                  slotName={"8B"}
                  recommendType={"Nearest to the entrance"}
                  price={30}
                  unit={"Baht/hr"}
                  handleClickRecommend={handleClickRecommend}
                />
              </View>
              <SubHeaderText
                text={"View All Available Slot"}
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
