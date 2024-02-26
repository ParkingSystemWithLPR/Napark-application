import { ActionMode } from "../enum/ActionMode";
import { Car } from "../utils/user";

export type RootParamList = {
  Splash: undefined;
  Auth: undefined;
  Authenticated: undefined;
  LogIn: { defaultEmail: string } | undefined;
  Register: undefined;
  ForgetPassword: undefined;
  ResetPassword: undefined;
  ChangePassword: undefined;
  MainScreen: { screen: string } | undefined; //idk I use it for nested navigation type checking
  Landing: undefined;
  MyBooking: undefined;
  Payment: undefined;
  Account: undefined;
  Others: undefined;
  Other: undefined;
  OtherStack: { screen: string };
  CarInfo: undefined;
  CarInfoSetup: { mode: ActionMode; carInfo?: Car };
  AllBookings: undefined;
  BookingStack: { screen: string };
  BookingSummary: undefined;
  ConfigParkingLot: undefined;
  ParkingLotsList: undefined;
  ParkingLotDetail: undefined;
  RequestParkingLot: undefined;
  RoleList: undefined;
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
