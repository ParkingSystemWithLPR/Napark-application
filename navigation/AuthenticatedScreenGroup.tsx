import Landing from "../screens/landing/Landing";

import { Stack } from "./BaseNavigation";

const AuthenticatedScreenGroup = () => {
  return (
    <Stack.Group>
      <Stack.Screen name="Landing" component={Landing} />
    </Stack.Group>
  );
};

export default AuthenticatedScreenGroup;
