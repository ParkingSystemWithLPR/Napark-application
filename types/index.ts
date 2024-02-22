export type RootParamList = {
  Splash: undefined;
  Auth: undefined;
  Authenticated: undefined;
  LogIn: { defaultEmail: string } | undefined;
  Register: undefined;
  ForgetPassword: undefined;
  ResetPassword: undefined;
  ChangePassword: undefined;
  MainScreen: undefined;
  Landing: undefined;
  MyBooking: undefined;
  Payment: undefined;
  Account: undefined;
  Other: undefined;
  Booking: undefined;
  BookingSummary: undefined;
  ConfirmBookingModal: {
    request: string;
  };
};

export type ButtonProps = {
  title: string;
  onPress: () => void;
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
