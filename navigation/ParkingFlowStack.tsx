import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import Colors from "@/constants/color";
import Arriving from "@/screens/parkingFlow/Arriving";
import ParkingConfirmation from "@/screens/parkingFlow/ParkingConfirmation";
import {
  AuthenticatedStackParamList,
  ParkingFlowStackParamList,
} from "@/types";

const Stack = createNativeStackNavigator<ParkingFlowStackParamList>();

export type ParkingFlowProps = NativeStackScreenProps<
  AuthenticatedStackParamList,
  "ParkingFlowStack"
>;

const ParkingFlowStack: React.FC<ParkingFlowProps> = () => {
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
          title: "Parking confirmation",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ParkingFlowStack;
