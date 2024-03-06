import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import IconButton from "@/components/button/IconButton";
import Colors from "@/constants/color";
import Arriving from "@/screens/parkingFlow/Arriving";
import { ParkingFlowStackParamList } from "@/types";

const Stack = createNativeStackNavigator<ParkingFlowStackParamList>();

const ParkingFlowStack = () => {
  const navigation = useNavigation();

  const backToOtherPage = () => {
    return (
      <IconButton
        icon={"chevron-left"}
        size={28}
        color={Colors.white}
        buttonStyle={{ padding: 0 }}
        onPress={() => navigation.goBack()}
      />
    );
  };
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
          headerLeft: backToOtherPage,
        }}
      />
    </Stack.Navigator>
  );
};

export default ParkingFlowStack;
