import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AuthenticatedStackParamList } from "@/types";

export type NotificationProps = NativeStackScreenProps<
  AuthenticatedStackParamList,
  "Notification"
>;

const Notification: React.FC<NotificationProps> = () => {
  return <></>;
};

export default Notification;
