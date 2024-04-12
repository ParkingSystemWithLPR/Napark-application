import { Address } from "@/types/parking-lot";

export const formatAddress = ({
  address1,
  sub_district,
  district,
  province,
  zip_code,
}: Address): string => {
  return `${address1} ${sub_district} ${district} ${province} ${zip_code}`;
};
