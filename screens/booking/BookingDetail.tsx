import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../../types";
import { View, StyleSheet } from "react-native";
import BodyText from "../../components/text/BodyText";
import { Ionicons } from "@expo/vector-icons";

export type BookingDetailProps = {} & NativeStackScreenProps<
  RootParamList,
  "BookingDetail"
>;

const BookingDetail: React.FC<BookingDetailProps> = () => {
  return (
    <View>
      <View>
        <BodyText text={"Engineer building 3, Chulalongkorn"} />
        <Ionicons name="location-sharp" />
      </View>
    </View>
  );
};
export default BookingDetail;

const style = StyleSheet.create({});
