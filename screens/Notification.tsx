import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect } from "react";

import IconButton from "@/components/button/IconButton";
import Colors from "@/constants/color";
import { AuthenticatedStackParamList } from "@/types";

export type NotificationProps = NativeStackScreenProps<
  AuthenticatedStackParamList,
  "Notification"
>;

const Notification: React.FC<NotificationProps> = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          icon={"chevron-left"}
          size={28}
          color={Colors.white}
          buttonStyle={{ padding: 0 }}
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, [navigation]);

  return <></>;
};

export default Notification;
