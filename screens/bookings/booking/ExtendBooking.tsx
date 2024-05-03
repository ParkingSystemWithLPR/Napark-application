import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

import PrimaryButton from "@/components/button/PrimaryButton";
import TimeInput from "@/components/input/TimeInput";
import BodyText from "@/components/text/BodyText";
import BodyContainer from "@/components/ui/BodyContainer";
import { useGetPossibleExtendTime } from "@/store/api/booking/useGetPossibleExtendTime";
import { useUpdateBookingTime } from "@/store/api/booking/useUpdateBookingTime";
import { useAuth } from "@/store/context/auth";
import { AuthenticatedStackParamList, BookingsStackParamList } from "@/types";
import { formatDate, formatTime } from "@/utils/date";

export type ExtendBookingProps = CompositeScreenProps<
  NativeStackScreenProps<BookingsStackParamList, "ExtendBooking">,
  NativeStackScreenProps<AuthenticatedStackParamList>
>;

const ExtendBooking: React.FC<ExtendBookingProps> = ({ navigation, route }) => {
  const { booking_id, start_time, end_time } = route.params;
  const { accessToken, authenticate } = useAuth();
  const [extendTime, setExtendTime] = useState<string>("");
  const [maxTime, setMaxTime] = useState<string>("");
  const [maxDateTime, setMaxDateTime] = useState<Date>();
  const minTime = new Date(end_time);
  const { mutateAsync: updateBookingTime } = useUpdateBookingTime();

  const getExtendTime = useGetPossibleExtendTime({
    queryParams: { booking_id: booking_id },
    auth: { accessToken, authenticate },
  });

  useEffect(() => {
    if (getExtendTime.isSuccess) {
      const formattedMaxDateTime =
        start_time.substring(0, 10) +
        getExtendTime.data.available_extend_time.substring(10);
      const time = formatTime(
        new Date(getExtendTime.data.available_extend_time)
      );
      setMaxDateTime(new Date(formattedMaxDateTime));
      setMaxTime(time);
    }
  }, [getExtendTime.data]);

  const onClick = async () => {
    await updateBookingTime(
      {
        queryParams: {
          booking_id: booking_id,
          extend_date: formatDate(new Date(start_time)),
          extend_time: extendTime + ":00",
        },
        auth: { accessToken, authenticate },
      },
      {
        onSuccess() {
          navigation.goBack();
        },
        onError(e) {
          Alert.alert("Error occured. Please try it again.");
        },
      }
    );
  };

  return (
    <BodyContainer innerContainerStyle={{ gap: 10 }}>
      <BodyText text={`You can extend time until : ${maxTime}`} />
      <TimeInput
        title=""
        onTimeChange={setExtendTime}
        value={extendTime}
        editable
        minTime={minTime}
        maxTime={maxDateTime}
      />
      <PrimaryButton title="Confirm" onPress={onClick} />
    </BodyContainer>
  );
};

export default ExtendBooking;
