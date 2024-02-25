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
<<<<<<< HEAD
=======
  ConfirmBookingModal: {
    request: string;
  };
>>>>>>> 396b49f14a897d0e8ec89da04bae167a5d37aafe
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
