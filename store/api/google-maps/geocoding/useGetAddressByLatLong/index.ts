import { UseQueryResult, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

type GerAddressInput = {
  queryParams: {
    lat: string;
    long: string;
  };
};

interface AddressResult {
  results: Address[];
}

interface Address {
  address_components: AddressComponent[];
  formatted_address: string;
}

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

type GerAddressService = (input: GerAddressInput) => Promise<string>;

const GG_GEOCODING_URL = "https://maps.googleapis.com/maps/api/geocode/json";
const RESULT_TYPE = "postal_code";

const extractDistrict = (components: AddressComponent[]): string => {
  const filtered = components.filter((component) =>
    component.types.includes(RESULT_TYPE)
  );
  return filtered.length > 0 ? filtered[0].long_name : "";
};

export const getAddressByLatLong: GerAddressService = async ({
  queryParams,
}) => {
  const response = await axios.get<AddressResult>(
    GG_GEOCODING_URL +
      `?result_type=${RESULT_TYPE}&latlng=${queryParams.lat},${queryParams.long}&key=`
  );
  return extractDistrict(response.data.results[0].address_components);
};

export const useGerAddressByUserId = (
  input: GerAddressInput
): UseQueryResult<string, AxiosError> => {
  return useQuery({
    queryKey: ["latlng", input.queryParams],
    queryFn: async () => getAddressByLatLong(input),
    refetchOnWindowFocus: false,
    refetchInterval: 0,
  });
};
