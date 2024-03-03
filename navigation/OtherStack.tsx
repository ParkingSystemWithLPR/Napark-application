import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import IconButton from "@/components/button/IconButton";
import Colors from "@/constants/color";
import ChangePassword from "@/screens/authentication/ChangePassword";
import CarInfo from "@/screens/other/CarInfo";
import CarInfoSetup from "@/screens/other/CarInfoSetup";
import Other from "@/screens/other/Other";
import ParkingLotDetail from "@/screens/parkinglot/ParkingLotDetail";
import ParkingLotsList from "@/screens/parkinglot/ParkingLotsList";
import RequestParkingLot from "@/screens/parkinglot/RequestPakingLot";
import RoleList from "@/screens/role/RoleList";
import { RootParamList } from "@/types";

const Stack = createNativeStackNavigator<RootParamList>();

const OtherStack = () => {
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
        name="Other"
        component={Other}
        options={{ title: "Menu" }}
      />
      <Stack.Screen
        name="CarInfo"
        component={CarInfo}
        options={{
          title: "My car",
          headerLeft: backToOtherPage,
        }}
      />
      <Stack.Screen
        name="CarInfoSetup"
        component={CarInfoSetup}
        options={{ title: "Set up" }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          title: "Change password",
          headerLeft: backToOtherPage,
        }}
      />
      <Stack.Screen
        name="ParkingLotsList"
        component={ParkingLotsList}
        options={{
          title: "My parking sapce",
          headerLeft: backToOtherPage,
        }}
      />
      <Stack.Screen
        name="RequestParkingLot"
        component={RequestParkingLot}
        options={{
          title: "My parking sapce",
          headerLeft: backToOtherPage,
        }}
      />
      <Stack.Screen
        name="ParkingLotDetail"
        component={ParkingLotDetail}
        options={{
          title: "Parking Space Detail",
          headerLeft: backToOtherPage,
        }}
      />
      <Stack.Screen
        name="RoleList"
        component={RoleList}
        options={{
          title: "Role",
          headerLeft: backToOtherPage,
        }}
      />
    </Stack.Navigator>
  );
};

export default OtherStack;
