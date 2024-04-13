import { StyleSheet, View } from "react-native";

import DetailText from "../text/DetailText";
import SectionAppForm from "../ui/SectionAppForm";

import Colors from "@/constants/color";
import { BusinessHour, ParkingLot } from "@/types/parking-lot";
import { formatAddress } from "@/utils/address";
import { useEffect, useState } from "react";
import { DayInAWeek } from "@/enum/DayInAWeek";
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
  const { business_days, slots, available_slots_count } = parkingLot;
  const [businessDaySet, setBusinessDaySet] = useState<BusinessDaySet[]>();

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

  return (
    <>
      <SectionAppForm title={"Location"} icon={"google-maps"}>
        <DetailText
          textStyle={styles.text}
          text={formatAddress(parkingLot.address)}
        />
      </SectionAppForm>
      <SectionAppForm title={"Traffic"} icon={"car"}>
        <View style={styles.textWrapper}>
          <DetailText text={"availabilty"} textStyle={styles.text} />
          <DetailText
            text={`${slots.length - available_slots_count} / ${slots.length}`}
          />
        </View>
      </SectionAppForm>
      <SectionAppForm title={"Business hours"} icon={"clock"}>
        {businessDaySet?.map((business_day) => (
          <View style={styles.textWrapper}>
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
  },
  text: {
    color: Colors.gray[900],
  },
});
