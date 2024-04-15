import { NavigatorScreenParams } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { FieldValues, UseFormReturn } from "react-hook-form";

import { Booking } from "./booking";
import { ParkingLot, ZonePricing } from "./parking-lot";
import { Car } from "./user";

import { ActionMode } from "@/enum/ActionMode";
import { ManagingCategory } from "@/enum/ManagingCategory";
import { BookingDetailState } from "@/screens/bookings/booking/BookingDetail";

export type RootParamList = {
  Splash: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Authenticated: NavigatorScreenParams<AuthenticatedStackParamList>;
};

export type AuthStackParamList = {
  LogIn: { defaultEmail: string } | undefined;
  Register: undefined;
  ForgetPassword: undefined;
};

export type AuthenticatedStackParamList = {
  MainScreen: NavigatorScreenParams<MainPageBottomTabParamList>;
  OtherStack: NavigatorScreenParams<OtherStackParamList>;
  BookingsStack: NavigatorScreenParams<BookingsStackParamList>;
  ParkingFlowStack: NavigatorScreenParams<ParkingFlowStackParamList>;
  ResetPassword: undefined;
};

export type MainPageBottomTabParamList = {
  Landing: undefined;
  Bookings: undefined;
  Account: undefined;
  Notification: undefined;
  Other: undefined;
};

export type OtherStackParamList = {
  CarInfo: undefined;
  CarInfoSetup: { mode: ActionMode; carInfo?: Car };
  ConfigParkingLot: undefined;
  ParkingLotsList: undefined;
  ParkingLotDetail: { parkingLotId: string };
  RequestParkingLot: undefined;
  EditParkingInfo: undefined;
  ConfigPricing: undefined;
  ConfigPlan: undefined;
  RoleMember: {
    form: UseFormReturn<FieldValues, any, undefined>;
    userList: string[];
  };
  ConfigRole: { mode: ActionMode; index: number };
  ChangePassword: undefined;
  AccountAndCard: undefined;
  ScanQR: undefined;
  ManagingCategory: undefined;
  ManagingList: { category: ManagingCategory };
  ConfigPrivilege: { mode: ActionMode; index: number };
  ConfigZone: {
    form: UseFormReturn<FieldValues, any, undefined>;
    mode: ActionMode;
    zoneIndex?: number;
    data?: ZonePricing;
    onEditPrivilege?: (idx: number, zone: ZonePricing) => void;
  };
};

export type BookingsStackParamList = {
  BookingDetail: { parkingLot: ParkingLot; defaultValue?: BookingDetailState };
  BookingSummary: {
    bookingDetailState: BookingDetailState;
    parkingLot: ParkingLot;
  };
  RoleMember: undefined;
  TopUp: { balance: number };
  PaymentOptions: { amount: number };
  PaymentSummary: { booking: Booking };
  PaymentSuccessful: undefined;
  PaymentChooseLicensePlate: undefined;
};

export type ParkingFlowStackParamList = {
  Arriving: { bookingRequest: BookingDetailState; parkingLot: ParkingLot };
  ParkingConfirmation: { bookingRequest: BookingDetailState };
};

export type AuthenticatedStackParamListProps =
  NavigationProp<AuthenticatedStackParamList>;

export type ButtonProps = {
  title: string;
  onPress: () => void;
  outerContainerStyle?: object;
  buttonStyle?: object;
  textStyle?: object;
  containerStyle?: object;
  disabled?: boolean;
};

export type TextProps = {
  text: string;
  containerStyle?: object;
  textStyle?: object;
  ellipsizeMode?: "middle" | "clip" | "head" | "tail";
  numberOfLines?: number;
};

export type HyperlinkTextProps = TextProps & {
  url: string;
};

export type ImageProps = {
  content: string;
  filename: string;
};
