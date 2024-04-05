import { NativeStackScreenProps } from "@react-navigation/native-stack";

import BodyContainer from "@/components/ui/BodyContainer";
import { MainPageBottomTabParamList } from "@/types";

export type NotificationProps = NativeStackScreenProps<
  MainPageBottomTabParamList,
  "Notification"
>;

const Notification: React.FC<NotificationProps> = () => {
  return (
    <BodyContainer>
      <></>
    </BodyContainer>
  );
};

export default Notification;
