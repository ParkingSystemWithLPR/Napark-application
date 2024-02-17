import { useEffect, useCallback, useRef } from "react";
import { ImageBackground, StyleSheet, View, Animated } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

import { RootStackParamList } from "../types";
import Colors from "../constants/color";

SplashScreen.preventAutoHideAsync();

export type SplashProps = {} & NativeStackScreenProps<
  RootStackParamList,
  "Splash"
>;

const Splash: React.FC<SplashProps> = ({ navigation }) => {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  });
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();

    setTimeout(() => {
      navigation.replace("Auth");
    }, 3000);
  }, [spinValue]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Animated.Image
        source={require("../assets/images/logo.png")}
        style={{ transform: [{ rotate: spin }], height: "25%", width: "25%" }}
        resizeMode="contain"
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.red[400],
  },
});
