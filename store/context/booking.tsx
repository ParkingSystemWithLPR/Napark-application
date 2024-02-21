import { ReactNode, createContext, useContext, useState } from "react";

const AUTH_URL = process.env.EXPO_PUBLIC_AUTH_API_URL;

interface IBookingContext {
  isCreatingBooking: boolean;
  currentBooking?: string;
  myBookingList?: string[];
  sendCreateRequest: (request: string) => void;
}

export const BookingContext = createContext<IBookingContext>({
  isCreatingBooking: false,
  currentBooking: undefined,
  myBookingList: undefined,
  sendCreateRequest: () => {},
});

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within an BookingProvider");
  }
  return context;
};

const BookingContextProvider = ({ children }: { children: ReactNode }) => {
  const [isCreatingBooking, setIsCreatingBooking] = useState<boolean>(false);
  const [myBookingList, setmyBookingList] = useState<string[]>([]);

  const sendCreateRequest = (request: string) => {
    setIsCreatingBooking(true);
    //mock
    setTimeout(() => {
      setmyBookingList([...myBookingList, request]);
      setIsCreatingBooking(false);
    }, 2000);
  };
  const value: IBookingContext = {
    isCreatingBooking,
    sendCreateRequest,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};

export default BookingContextProvider;
