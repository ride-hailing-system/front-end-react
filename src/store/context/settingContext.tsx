import React, {
  createContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react';

export type AfterNightHours = {
  start: string | undefined;
  end: string | undefined;
};

export type GeneralSettings = {
  appName: string | undefined;
  supportEmail: string | undefined;
  supportPhone: string | undefined;
  currency: string | undefined;
  afterNightHours?: AfterNightHours;
};

export type LocationSettings = {
  pickupRadius: number | undefined;
  locationUpdateInterval: number | undefined;
};

export type RideSettings = {
  baseFare: number | undefined;
  ratePerKm: number | undefined;
  ratePerKmAfterNight: number | undefined;
  cancelationTimeLimit: number | undefined;
  maxRideDistance: number | undefined;
  rideRequestTimeout: number | undefined;
};

export type PaymentSettings = {
  paymentMethods: string[] | undefined;
  taxRate: number | undefined;
  driverCommission: number | undefined;
};

export type UserSettings = {
  requireKyc: boolean | undefined;
  requireDriverApproval: boolean | undefined;
};

export type NotificationSettings = {
  enableSms: boolean | undefined;
  enablePush: boolean | undefined;
  enableEmail: boolean | undefined;
};

export type Templates = {
  driverAssigned: string | undefined;
  rideCanceled: string | undefined;
};

export type ISetting = {
  _id?: string;
  general: GeneralSettings;
  location: LocationSettings;
  ride: RideSettings;
  payment: PaymentSettings;
  user: UserSettings;
  notification: NotificationSettings;
  templates: Templates;
  createdAt?: Date;
  updatedAt?: Date;
};

export type SettingContextType = {
  setting: ISetting;
  setSetting: Dispatch<SetStateAction<ISetting>>;
};

export const defaultSetting: ISetting = {
  general: {
    appName: undefined,
    supportEmail: undefined,
    supportPhone: undefined,
    currency: undefined,
    afterNightHours: {
      start: undefined,
      end: undefined,
    },
  },
  location: {
    pickupRadius: 0,
    locationUpdateInterval: 0,
  },
  ride: {
    baseFare: 0,
    ratePerKm: 0,
    ratePerKmAfterNight: 0,
    cancelationTimeLimit: 0,
    maxRideDistance: 0,
    rideRequestTimeout: 0,
  },
  payment: {
    paymentMethods: [],
    taxRate: 0,
    driverCommission: 0,
  },
  user: {
    requireKyc: false,
    requireDriverApproval: false,
  },
  notification: {
    enableSms: false,
    enablePush: false,
    enableEmail: false,
  },
  templates: {
    driverAssigned: undefined,
    rideCanceled: undefined,
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const SettingContext = createContext<SettingContextType>({
  setting: defaultSetting,
  setSetting: () => {},
});

export const SettingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [setting, setSetting] = useState<ISetting>(defaultSetting);

  return (
    <SettingContext.Provider value={{ setting, setSetting }}>
      {children}
    </SettingContext.Provider>
  );
};
