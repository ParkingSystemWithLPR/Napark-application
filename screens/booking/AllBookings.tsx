import { View, Text, StyleSheet, FlatList } from "react-native";
import CompletedTimeSlot from "../../components/booking/CompletedTimeSlot";

const mock = [
  {
    licensePlate: "กข 1334",
    space: "space 4c",
    date: "20/01/41",
    time: "03:38 pm",
    price: "200",
  },
  {
    licensePlate: "กข 1334",
    space: "space 4c",
    date: "20/01/41",
    time: "03:38 pm",
    price: "200",
  },
  {
    licensePlate: "กข 1334",
    space: "space 4c",
    date: "20/01/41",
    time: "03:38 pm",
    price: "200",
  },
  {
    licensePlate: "กข 1334",
    space: "space 4c",
    date: "20/01/41",
    time: "03:38 pm",
    price: "200",
  },
  {
    licensePlate: "กข 1334",
    space: "space 4c",
    date: "20/01/41",
    time: "03:38 pm",
    price: "200",
  },
  {
    licensePlate: "กข 1334",
    space: "space 4c",
    date: "20/01/41",
    time: "03:38 pm",
    price: "200",
  },
  {
    licensePlate: "กข 1334",
    space: "space 4c",
    date: "20/01/41",
    time: "03:38 pm",
    price: "200",
  },
  {
    licensePlate: "กข 1334",
    space: "space 4c",
    date: "20/01/41",
    time: "03:38 pm",
    price: "200",
  },
  {
    licensePlate: "กข 1334",
    space: "space 4c",
    date: "20/01/41",
    time: "03:38 pm",
    price: "200",
  },
  {
    licensePlate: "กข 1334",
    space: "space 4c",
    date: "20/01/41",
    time: "03:38 pm",
    price: "200",
  },
  {
    licensePlate: "กข 1334",
    space: "space 4c",
    date: "20/01/41",
    time: "03:38 pm",
    price: "200",
  },
  {
    licensePlate: "กข 1334",
    space: "space 4c",
    date: "20/01/41",
    time: "03:38 pm",
    price: "200",
  },
  {
    licensePlate: "กข 1334",
    space: "space 4c",
    date: "20/01/41",
    time: "03:38 pm",
    price: "200",
  },
  {
    licensePlate: "กข 1334",
    space: "space 4c",
    date: "20/01/41",
    time: "03:38 pm",
    price: "200",
  },
  {
    licensePlate: "กข 1334",
    space: "space 4c",
    date: "20/01/41",
    time: "03:38 pm",
    price: "200",
  },
];

const AllBookings: React.FC<{}> = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={mock}
        renderItem={({ item }) => (
          <CompletedTimeSlot
            licensePlate={item.licensePlate}
            space={item.space}
            date={item.date}
            time={item.time}
            price={item.price}
          />
        )}
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
