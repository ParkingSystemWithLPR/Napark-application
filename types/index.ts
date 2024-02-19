export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Authenticated: undefined;
  LogIn: undefined;
  Register: undefined;
  ForgetPassword: undefined;
  ResetPassword: undefined;
  ChangePassword: undefined;
  MainScreen: undefined;
  Landing: undefined;
};

export type RootBottomTabParamList = {
  Landing: undefined;
  MyBooking: undefined;
  Payment: undefined;
  Account: undefined;
  Other: undefined;
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
