import { NavigatorScreenParams } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";

import { ParkingLot } from "./parking-lot/ParkingLot";
import { Car } from "./user";

import { ActionMode } from "@/enum/ActionMode";
import { BookingRequest } from "@/screens/booking/BookingDetail";

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
  ResetPassword: undefined;
  MainScreen: NavigatorScreenParams<MainPageBottomTabParamList>;
  OtherStack: NavigatorScreenParams<OtherStackParamList>;
  BookingStack: NavigatorScreenParams<BookingStackParamList>;
  PaymentStack: NavigatorScreenParams<PaymentStackParamList>;
};

export type MainPageBottomTabParamList = {
  Landing: undefined;
  MyBooking: undefined;
  Payment: undefined;
  Account: undefined;
  Other: undefined;
};

export type OtherStackParamList = {
  CarInfo: undefined;
  CarInfoSetup: { mode: ActionMode; carInfo?: Car };
  ConfigParkingLot: undefined;
  ParkingLotsList: undefined;
  ParkingLotDetail: undefined;
  RequestParkingLot: undefined;
  RoleList: undefined;
  ChangePassword: undefined;
};

export type BookingStackParamList = {
  BookingDetail: { parkingLot: ParkingLot };
  BookingSummary: { bookingRequest: BookingRequest; parkingLot: ParkingLot };
};

export type PaymentStackParamList = {
  Payment: undefined;
  AccountAndCard: undefined;
  ScanQR: undefined;
  PayTheBill: undefined;
}

export type AuthenticatedStackParamListProps =
  NavigationProp<AuthenticatedStackParamList>;

export type ButtonProps = {
  title: string;
  onPress: () => void;
  outerContainerStyle?: object;
  buttonStyle?: object;
  textStyle?: object;
  containerStyle?: object;
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
