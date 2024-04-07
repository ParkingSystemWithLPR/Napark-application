import { NavigatorScreenParams } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";

import { ParkingLot } from "./parking-lot/ParkingLot";
import { Car } from "./user";

import { ActionMode } from "@/enum/ActionMode";
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
  RoleList: undefined;
  RoleMember: undefined;
  ConfigRole: { mode: ActionMode; roleId?: string };
  ChangePassword: undefined;
  AccountAndCard: undefined;
  ScanQR: undefined;
  PayTheBill: undefined;
};

export type BookingsStackParamList = {
  BookingDetail: { parkingLot: ParkingLot };
  BookingSummary: {
    bookingDetailState: BookingDetailState;
    parkingLot: ParkingLot;
  };
  RoleMember: undefined;
  TopUp: { balance: number };
  PaymentOptions: { amount: number };
  PayTheBill: undefined;
  PaymentSummary: undefined;
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
