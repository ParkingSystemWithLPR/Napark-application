import { ReactNode, createContext, useContext, useState } from "react";

import {
  CreateProfileInput,
  useCreateProfile,
} from "../api/user/useCreateProfile";
import { EditProfileInput, useEditProfile } from "../api/user/useEditProfile";

import { Profile } from "@/types/user";

interface IProfileContext {
  profile: Profile;
  setProfile: (profile: Profile) => void;
  createProfile: (
    data: CreateProfileInput,
    customOnSuccess: (data: Profile) => void
  ) => Promise<void>;
  updateProfile: (data: EditProfileInput) => Promise<void>;
}

export const ProfileContext = createContext<IProfileContext>({
  profile: {
    firstname: "",
    lastname: "",
    email: "",
    tel: "",
    date_of_birth: "",
    user_car: [],
  },
  setProfile: () => {},
  createProfile: async () => {},
  updateProfile: async () => {},
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
    firstname: "",
    lastname: "",
    email: "",
    tel: "",
    date_of_birth: "",
    user_car: [],
  });
  const { mutateAsync: createProfileAsync } = useCreateProfile();
  const { mutateAsync: editProfileAsync } = useEditProfile();

  const createProfile = async (
    data: CreateProfileInput,
    customOnSuccess: (data: Profile) => void
  ) => {
    await createProfileAsync(data, {
      onSuccess(data) {
        setProfile(data);
        customOnSuccess(data);
      },
    });
  };

  const updateProfile = async (data: EditProfileInput) => {
    await editProfileAsync(data, {
      onSuccess(data) {
        setProfile(data);
      },
    });
  };

  const value: IProfileContext = {
    profile,
    setProfile,
    createProfile,
    updateProfile,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export default ProfileContextProvider;
