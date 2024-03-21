import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";

import SessionsList from "@/components/booking/SessionsList";
import TabsContainer from "@/components/ui/TabsContainer";
import { BookingType } from "@/enum/BookingType";
import {
  MainPageBottomTabParamList,
  AuthenticatedStackParamList,
} from "@/types";

export type MyBookingProps = CompositeScreenProps<
  NativeStackScreenProps<MainPageBottomTabParamList, "MyBooking">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const ActiveSessions = <SessionsList type={BookingType.ACTIVE} />;
const CompletedSessions = <SessionsList type={BookingType.COMPLETED} />;

const MyBooking: React.FC<MyBookingProps> = () => {
  return (
    <TabsContainer
      leftTabName={BookingType.ACTIVE}
      leftTabContent={ActiveSessions}
      rightTabName={BookingType.COMPLETED}
      rightTabContent={CompletedSessions}
    />
  );
};

export default MyBooking;
