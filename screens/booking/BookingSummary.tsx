import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { RootParamList } from "../../types";
import BodyText from "../../components/text/BodyText";
import PrimaryButton from "../../components/button/PrimaryButton";
import Ionicons from "react-native-vector-icons/Ionicons";

export type BookingSummaryProps = {} & NativeStackScreenProps<
  RootParamList,
  "BookingSummary"
>;

const BookingSummary: React.FC<BookingSummaryProps> = ({ navigation }) => {
  const openModal = () => {
    navigation.navigate("ConfirmBookingModal");
  };
  type BookingAttribute = {
    attribute: string;
    value: string;
  };
  const RenderAttribute: React.FC<BookingAttribute> = ({
    attribute,
    value,
  }) => {
    return (
      <View style={styles.attributeContainer}>
        <BodyText
          text={attribute + ":"}
          containerStyle={styles.attributeField}
        />
        <BodyText text={value} containerStyle={styles.valueField} />
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.locationSection}>
        <View style={styles.locationContainer}>
          <Ionicons
            name="navigate-circle-outline"
            style={styles.image}
          ></Ionicons>
          <BodyText
            text="Engineer building 3, Chulalongkorn"
            containerStyle={styles.locationBox}
          />
        </View>
      </View>
      <View style={styles.bookingDetailSection}>
        <View style={styles.bookingDetailContainer}>
          <BodyText
            text="Booking Details"
            containerStyle={styles.headerStyle}
          />
          <RenderAttribute attribute="Space" value="6a" />
          <RenderAttribute attribute="Check-in Time" value="11:00 am" />
          <RenderAttribute attribute="Check-out Time (Est)" value="05:00 pm" />
          <RenderAttribute attribute="Specifications" value="None" />
        </View>
        <View style={styles.routeContainer}>
          <BodyText text={"Don`t know the route?"} />
          <BodyText text={"Get Directions"} textStyle={styles.colorText} />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton title={"Book"} onPress={openModal} />
      </View>
    </View>
  );
};
export default BookingSummary;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 40,
    gap: 15,
  },
  locationSection: {
    flex: 1,
    justifyContent: "center",
    // borderColor: "green",
    // borderWidth: 1,
  },
  locationContainer: {
    height: "70%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    // borderWidth: 1,
  },
  image: {
    fontSize: 25,
    marginRight: 5,
    // borderColor: "purple",
    // borderWidth: 1,
  },
  locationBox: {
    flex: 1,
    // height: 50,
    // backgroundColor: "white",
    justifyContent: "center",
    // borderWidth: 1,
  },
  bookingDetailSection: {
    flex: 5,
    gap: 15,
    // borderColor: "red",
    // borderWidth: 1,
  },
  bookingDetailContainer: {
    flex: 1,
    backgroundColor: "white",
    // borderColor: "pink",
    // borderWidth: 1,
  },
  headerStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
  },
  attributeContainer: {
    flex: 1,
    flexDirection: "row",
    // borderColor: "black",
    // borderWidth: 1,
  },
  attributeField: {
    flex: 4,
    marginLeft: 10,
    // borderWidth: 1,
  },
  valueField: {
    flex: 2,
  },
  routeContainer: {
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    columnGap: 5,
  },
  colorText: {
    color: "purple",
  },
  buttonContainer: {
    flex: 1,
    // borderColor: "black",
    // borderWidth: 1,
  },
});
