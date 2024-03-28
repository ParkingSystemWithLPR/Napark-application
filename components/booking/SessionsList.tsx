import { FlatList } from "react-native";

import ActiveSession from "./ActiveSession";
import CompletedSession from "./CompletedSession";

import { BookingType } from "@/enum/BookingType";
import { MOCKED_SESSIONS, mockedSessionsProps } from "@/mock/mockData";
import { formatDateAndTime } from "@/utils/date";

interface sessionsProps {
  type: BookingType;
}

const SessionsList: React.FC<sessionsProps> = ({ type }) => {
  return (
    <FlatList
      data={MOCKED_SESSIONS}
      keyExtractor={(item: mockedSessionsProps) => item.id}
      renderItem={({ item }) => {
        if (type === BookingType.ACTIVE) {
          return (
            <ActiveSession
              licensePlate={item.licensePlate}
              space={item.space}
              timeRemaining="01:30"
            />
          );
        } else {
          const { date, time } = formatDateAndTime(new Date(item.dateAndTime));
          return (
            <CompletedSession
              licensePlate={item.licensePlate}
              space={item.space}
              date={date}
              time={time}
              price={item.price}
            />
          );
        }
      }}
      overScrollMode="never"
    />
  );
};

export default SessionsList;
