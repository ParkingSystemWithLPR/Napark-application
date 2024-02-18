export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Authenticated: undefined;
  LogIn: undefined;
  Register: undefined;
  ForgetPassword: undefined;
  ResetPassword: undefined;
  ChangePassword: undefined;
  Landing: undefined;
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
