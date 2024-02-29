import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import IconButton from "../components/button/IconButton";
import Colors from "../constants/color";
import CarInfo from "../screens/other/CarInfo";
import CarInfoSetup from "../screens/other/CarInfoSetup";
import { RootParamList } from "../types";

const Stack = createNativeStackNavigator<RootParamList>();

const OtherStack = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.red[400].toString(),
        },
        headerTitleStyle: {
          fontSize: 18,
        },
        headerTintColor: Colors.white.toString(),
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="CarInfo"
        component={CarInfo}
        options={{
          title: "My car",
          headerLeft: () => {
            return (
              <IconButton
                icon={"chevron-left"}
                size={28}
                color={Colors.white}
                buttonStyle={{ padding: 0 }}
                onPress={() => navigation.goBack()}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="CarInfoSetup"
        component={CarInfoSetup}
        options={{ title: "Set up" }}
      />
    </Stack.Navigator>
  );
};

export default OtherStack;
