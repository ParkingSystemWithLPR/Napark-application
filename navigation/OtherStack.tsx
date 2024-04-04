import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import IconButton from "@/components/button/IconButton";
import Colors from "@/constants/color";
import CarInfo from "@/screens/other/carInfo/CarInfo";
import CarInfoSetup from "@/screens/other/carInfo/CarInfoSetup";
import ChangePassword from "@/screens/other/ChangePassword";
import ParkingLotDetail from "@/screens/other/parkinglot/ParkingLotDetail";
import ParkingLotsList from "@/screens/other/parkinglot/ParkingLotsList";
import RequestParkingLot from "@/screens/other/parkinglot/RequestPakingLot";
import ConfigRole from "@/screens/role/ConfigRole";
import RoleMember from "@/screens/role/RoleMember";
import { AuthenticatedStackParamList, OtherStackParamList } from "@/types";
import ManagingCategory from "@/screens/role/ManagingCategory";
import ManagingList from "@/screens/role/ManagingList";
import ConfigPrivilege from "@/screens/role/ConfigPrivilege";

const Stack = createNativeStackNavigator<OtherStackParamList>();

export type OtherProps = NativeStackScreenProps<
  AuthenticatedStackParamList,
  "OtherStack"
>;

const OtherStack: React.FC<OtherProps> = ({ navigation }) => {
  const backToPreviousPage = () => {
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
        headerBackTitleVisible: false,
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
          headerLeft: backToPreviousPage,
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
          headerLeft: backToPreviousPage,
        }}
      />
      <Stack.Screen
        name="ParkingLotsList"
        component={ParkingLotsList}
        options={{
          title: "My parking sapce",
          headerLeft: backToPreviousPage,
        }}
      />
      <Stack.Screen
        name="RequestParkingLot"
        component={RequestParkingLot}
        options={{
          title: "Create parking space",
        }}
      />
      <Stack.Screen
        name="ParkingLotDetail"
        component={ParkingLotDetail}
        options={{
          title: "Parking space detail",
        }}
      />
      <Stack.Screen
        name="ConfigRole"
        component={ConfigRole}
        options={{
          title: "Role",
        }}
      />
      <Stack.Screen
        name="RoleMember"
        component={RoleMember}
        options={{
          title: "Assign member",
        }}
      />
      <Stack.Screen
        name="ManagingCategory"
        component={ManagingCategory}
        options={{
          title: "Managing Category",
        }}
      />
      <Stack.Screen
        name="ManagingList"
        component={ManagingList}
        options={{
          title: `Managing List`,
        }}
      />
      <Stack.Screen
        name="ConfigPrivilege"
        component={ConfigPrivilege}
        options={{
          title: `Privilege`,
        }}
      />
    </Stack.Navigator>
  );
};

export default OtherStack;
