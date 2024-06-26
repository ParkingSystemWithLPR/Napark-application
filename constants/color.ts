import { ColorValue } from "react-native";

export type ColorBreakdownType = {
  50: ColorValue;
  100: ColorValue;
  200: ColorValue;
  300: ColorValue;
  400: ColorValue;
  500: ColorValue;
  600: ColorValue;
  700: ColorValue;
  800: ColorValue;
  900: ColorValue;
};

export type ColorType = {
  black: ColorValue;
  white: ColorValue;
  red: ColorBreakdownType;
  gray: ColorBreakdownType;
  blue: ColorBreakdownType;
  lightBlue: ColorBreakdownType;
  green: ColorBreakdownType;
};

const Colors: ColorType = {
  black: "#000000",
  white: "#ffffff",
  red: {
    50: "#FDE8E9",
    100: "#f9b9bb",
    200: "#f7979b",
    300: "#f3676d",
    400: "#f14951",
    500: "#ed1c25",
    600: "#d81922",
    700: "#a8141a",
    800: "#820f14",
    900: "#640c10",
  },
  gray: {
    50: "#fdfdfd",
    100: "#f7f7f7",
    200: "#f4f4f4",
    300: "#eeeeee",
    400: "#ebebeb",
    500: "#e6e6e6",
    600: "#d1d1d1",
    700: "#a3a3a3",
    800: "#7f7f7f",
    900: "#616161",
  },
  blue: {
    50: "#e7edf6",
    100: "#b4c8e2",
    200: "#8faed4",
    300: "#5c89c0",
    400: "#3d72b4",
    500: "#0c4fa1",
    600: "#0b4893",
    700: "#093872",
    800: "#072b59",
    900: "#052144",
  },
  lightBlue: {
    50: "#e6f7ff",
    100: "#b0e5ff",
    200: "#8ad8ff",
    300: "#54c6ff",
    400: "#33bbff",
    500: "#00aaff",
    600: "#009be8",
    700: "#0079b5",
    800: "#005e8c",
    900: "#00476b",
  },
  green: {
    50: "#f0ffe6",
    100: "#cfffb2",
    200: "#b8ff8d",
    300: "#98fe5a",
    400: "#84fe39",
    500: "#65fe08",
    600: "#5ce707",
    700: "#48b406",
    800: "#388c04",
    900: "#2a6b03",
  },
};

export default Colors;
