import { NavigatorScreenParams } from "@react-navigation/native";

import { Car } from "./user";

import { ActionMode } from "@/enum/ActionMode";

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
};

export type MainPageBottomTabParamList = {
  Landing: undefined;
  MyBooking: undefined;
  Payment: undefined;
  Account: undefined;
  Others: undefined;
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
  BookingDetail: undefined;
  BookingSummary: undefined;
};

export type ButtonProps = {
  title: string;
  onPress: () => void;
  outerContainerStyle?: object;
  buttonStyle?: object;
  textStyle?: object;
};

export type TextProps = {
  text: string;
  containerStyle?: object;
  textStyle?: object;
};
export type HyperlinkTextProps = TextProps & {
  url: string;
};
