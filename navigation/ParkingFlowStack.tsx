import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Colors from "@/constants/color";
import Arriving from "@/screens/parkingFlow/Arriving";
import ParkingConfirmation from "@/screens/parkingFlow/ParkingConfirmation";
import { ParkingFlowStackParamList } from "@/types";

const Stack = createNativeStackNavigator<ParkingFlowStackParamList>();

const ParkingFlowStack = () => {
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
        name="Arriving"
        component={Arriving}
        options={{
          title: "Arriving",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="ParkingConfirmation"
        component={ParkingConfirmation}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ParkingFlowStack;
