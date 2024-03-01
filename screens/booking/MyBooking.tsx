import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";

import MyBookingTab from "../../components/booking/MyBookingTab";
import { RootParamList } from "../../types";

export type MyBookingProps = NativeStackScreenProps<RootParamList, "MyBooking">;

const MyBooking: React.FC<MyBookingProps> = () => <MyBookingTab />;

export default MyBooking;
