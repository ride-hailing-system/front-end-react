import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type UserDataType = {
  _id?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  photoUrl?: string;
  role?: string;
};

export type AppData = {
  userData: UserDataType;
};

export type UserContextType = {
  userData: UserDataType;
  setUserData: (value: UserDataType) => void;
};

export const UserContext = createContext<UserContextType>({
  userData: {},
  setUserData: () => {},
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<UserDataType>({
    _id: undefined,
    firstName: undefined,
    lastName: undefined,
    phoneNumber: undefined,
    email: undefined,
    photoUrl: undefined,
    role: undefined,
  });

  // Load from localStorage
  useEffect(() => {
    try {
      const storedData = localStorage.getItem("appData");
      const appData: AppData | null = storedData
        ? JSON.parse(storedData)
        : null;

      if (appData?.userData) {
        setUserData(appData.userData);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      const appData: AppData = { userData };
      localStorage.setItem("appData", JSON.stringify(appData));
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
