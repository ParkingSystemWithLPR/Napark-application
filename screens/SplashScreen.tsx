import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useCallback, useRef } from "react";
import { StyleSheet, View, Animated } from "react-native";

import Colors from "@/constants/color";
import { useAuth } from "@/store/context/auth";
import { RootParamList } from "@/types";

export type SplashProps = NativeStackScreenProps<RootParamList, "Splash">;

const Splash: React.FC<SplashProps> = ({ navigation }) => {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });
  const spinValue = useRef(new Animated.Value(0)).current;
  const { authenticate } = useAuth();

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();

    const fetchToken = async () => {
      const storedAccessToken = await AsyncStorage.getItem("authToken");
      const storedRefreshToken = await AsyncStorage.getItem("refreshToken");

      if (storedAccessToken && storedRefreshToken) {
        authenticate(storedAccessToken, storedRefreshToken);
        navigation.replace("Authenticated");
      } else {
        navigation.replace("Auth");
      }
    };

    if (fontsLoaded || fontError) fetchToken();
  }, [fontsLoaded, fontError, spinValue, navigation]);

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
