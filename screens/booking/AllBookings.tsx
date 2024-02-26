import { View, StyleSheet, FlatList } from "react-native";

import CompletedTimeSlot from "../../components/booking/CompletedTimeSlot";
import { formatDateAndTime } from "../../utils/date";
import { MOCKED_SESSIONS } from "../../utils/mockData";

interface allBookingProps { }

const AllBookings: React.FC<allBookingProps> = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={MOCKED_SESSIONS}
        renderItem={({ item }) => {
          const dateAndTime = formatDateAndTime(new Date(item.dateAndTime)).split(" ");
          return <CompletedTimeSlot
            licensePlate={item.licensePlate}
            space={item.space}
            date={dateAndTime[0]}
            time={dateAndTime[1]}
            price={item.price}
          />
        }
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default AllBookings;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
});
