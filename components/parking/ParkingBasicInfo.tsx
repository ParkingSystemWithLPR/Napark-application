import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";

import DetailText from "../text/DetailText";
import SectionAppForm from "../ui/SectionAppForm";

import Colors from "@/constants/color";
import { DayInAWeek } from "@/enum/DayInAWeek";
import { Availability, BusinessHour, ParkingLot } from "@/types/parking-lot";
import { formatAddress } from "@/utils/address";
import {
  formatDayRange,
  formatDisplayTime,
  isEqualBusinessHour,
} from "@/utils/date";

export type ParkingBasicInfoProps = {
  parkingLot: ParkingLot;
};

type BusinessHourSet = {
  days: string[];
  businessHour: BusinessHour;
};

type BusinessDaySet = {
  days: string;
  businessHour: string;
};

const ParkingBasicInfo: React.FC<ParkingBasicInfoProps> = ({ parkingLot }) => {
  const { business_days, slots } = parkingLot;
  const [businessDaySet, setBusinessDaySet] = useState<BusinessDaySet[]>();
  const [availability, setAvailability] = useState<{
    [floor: number]: { [zone: string]: Availability };
  }>();

  useEffect(() => {
    const businessHoursSet: BusinessHourSet[] = [];
    const newBusinessDaySet: BusinessDaySet[] = [];
    business_days.forEach((businessDay) => {
      const { weekday, close_time, open_time } = businessDay;
      if (
        !businessHoursSet.some((e) =>
          isEqualBusinessHour(e.businessHour, { close_time, open_time })
        )
      ) {
        businessHoursSet.push({
          days: [],
          businessHour: { close_time, open_time },
        });
      }
      const index = businessHoursSet.findIndex((e) =>
        isEqualBusinessHour(e.businessHour, { close_time, open_time })
      );
      businessHoursSet[index].days.push(weekday);
    });
    businessHoursSet.forEach((businessHourSet) => {
      const { days, businessHour } = businessHourSet;
      newBusinessDaySet.push({
        days: formatDayRange(days as DayInAWeek[]),
        businessHour: `${formatDisplayTime(
          businessHour.open_time
        )} - ${formatDisplayTime(businessHour.close_time)}`,
      });
    });
    setBusinessDaySet(newBusinessDaySet);
  }, [business_days]);

  useEffect(() => {
    const newAvailability: {
      [floor: number]: { [zone: string]: Availability };
    } = {};
    slots.forEach((slot) => {
      const { floor, zone, is_vacant } = slot;
      const vacant = is_vacant ? 1 : 0;
      if (newAvailability[floor] && newAvailability[floor][zone]) {
        newAvailability[floor][zone].vacant += vacant;
        newAvailability[floor][zone].capacity += 1;
      } else if (newAvailability[floor]) {
        newAvailability[floor][zone] = { vacant, capacity: 1 };
      } else {
        newAvailability[floor] = { [`${zone}`]: { vacant, capacity: 1 } };
      }
    });
    setAvailability(newAvailability);
  }, [slots]);

  return (
    <>
      <SectionAppForm title={"Location"} icon={"google-maps"}>
        <DetailText
          textStyle={styles.text}
          text={formatAddress(parkingLot.address)}
        />
      </SectionAppForm>
      <SectionAppForm title={"Traffic"} icon={"car"}>
        {availability &&
          Object.entries(availability).map(([key, value]) => (
            <View key={key}>
              <DetailText text={`Floor ${key}`} />
              {Object.entries(value).map(([xkey, item]) => (
                <View key={`${key}_${xkey}`} style={styles.subTextWrapper}>
                  <DetailText text={`zone ${xkey}`} textStyle={styles.text} />
                  <DetailText
                    text={`${item.capacity - item.vacant} / ${item.capacity}`}
                  />
                </View>
              ))}
            </View>
          ))}
      </SectionAppForm>
      <SectionAppForm title={"Business hours"} icon={"clock"}>
        {businessDaySet?.map((business_day, index) => (
          <View key={index} style={styles.textWrapper}>
            <DetailText text={business_day.days} textStyle={styles.text} />
            <DetailText text={business_day.businessHour} />
          </View>
        ))}
      </SectionAppForm>
    </>
  );
};

export default ParkingBasicInfo;

const styles = StyleSheet.create({
  textWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10,
  },
  subTextWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  text: {
    color: Colors.gray[900],
  },
});
