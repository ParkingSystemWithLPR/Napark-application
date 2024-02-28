import { FlatList, StyleSheet, View } from "react-native";

import ActiveTimeSlot from "./ActiveSession";
import CompletedSession from "./CompletedSession";
import { formatDateAndTime } from "../../utils/date";
import { MOCKED_SESSIONS } from "../../utils/mockData";

interface sessionsProps {
  type: "ACTIVE" | "COMPLETED";
}

const SessionsList: React.FC<sessionsProps> = ({ type }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={MOCKED_SESSIONS}
        renderItem={({ item }) => {
          if (type === "ACTIVE") {
            return (
              <ActiveTimeSlot
                licensePlate={item.licensePlate}
                space={item.space}
                timeRemaining="01hr:30min"
              />
            );
          } else {
            const dateAndTime = formatDateAndTime(
              new Date(item.dateAndTime)
            ).split(" ");
            return (
              <CompletedSession
                licensePlate={item.licensePlate}
                space={item.space}
                date={dateAndTime[0]}
                time={dateAndTime[1]}
                price={item.price}
              />
            );
          }
        }}
      />
    </View>
  );
};

export default SessionsList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
});
