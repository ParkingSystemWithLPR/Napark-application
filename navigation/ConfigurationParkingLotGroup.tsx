import ParkingLotDetail from "../screens/configuration-parking-lot/ParkingLotDetail";
import ParkingLotsList from "../screens/configuration-parking-lot/ParkingLotsList";
import RequestParkingLot from "../screens/configuration-parking-lot/RequestPakingLot";

import { Stack } from "./BaseNavigation";

const AuthScreenGroup = () => {
  return (
    <Stack.Group>
      <Stack.Screen name="ParkingLotsList" component={ParkingLotsList}/>
      <Stack.Screen name="ParkingLotDetail" component={ParkingLotDetail}/>
      <Stack.Screen name="RequestParkingLot" component={RequestParkingLot}/>
    </Stack.Group>
  );
};

export default AuthScreenGroup;
