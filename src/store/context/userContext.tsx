import React, { createContext, useState, type ReactNode } from 'react';

export type UserDataType = {
  _id?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  photoUrl?: string;
  role?: string;
  token?: string;
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
    token: undefined,
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
