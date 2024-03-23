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
  ParkingFlowStack: NavigatorScreenParams<ParkingFlowStackParamList>;
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
  ParkingLotDetail: { parkingLotId: string };
  RequestParkingLot: undefined;
  EditParkingInfo: undefined;
  ConfigPricing: undefined;
  ConfigPlan: undefined;
  RoleList: undefined;
  RoleMember: undefined;
  ConfigRole: { mode: ActionMode; roleId?: string };
  ChangePassword: undefined;
  AccountAndCard: undefined;
  ScanQR: undefined;
  PayTheBill: undefined;
};

export type BookingStackParamList = {
  BookingDetail: { parkingLot: ParkingLot };
  BookingSummary: { bookingRequest: BookingRequest; parkingLot: ParkingLot };
  RoleMember: undefined;
};

export type PaymentStackParamList = {
  TopUp: undefined;
  PaymentChoice: undefined;
  PayTheBill: undefined;
};
export type ParkingFlowStackParamList = {
  Arriving: { bookingRequest: BookingRequest; parkingLot: ParkingLot };
  ParkingConfirmation: { bookingRequest: BookingRequest };
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
