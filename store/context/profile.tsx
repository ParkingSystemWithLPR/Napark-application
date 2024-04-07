import { ReactNode, createContext, useContext, useState } from "react";

import { Profile } from "@/types/user";

interface IProfileContext {
  profile: Profile;
  setProfile: (profile: Profile) => void;
}

export const ProfileContext = createContext<IProfileContext>({
  profile: {
    _id: "",
    firstname: "",
    lastname: "",
    email: "",
    tel: "",
    date_of_birth: "",
    user_cars: [],
    profile_image: "",
  },
  setProfile: () => {},
});

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};

const ProfileContextProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile>({
    _id: "",
    firstname: "",
    lastname: "",
    email: "",
    tel: "",
    date_of_birth: "",
    user_cars: [],
    profile_image: "",
  });

  const value: IProfileContext = {
    profile,
    setProfile,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export default ProfileContextProvider;
