import { gql } from '@apollo/client';


export const SETTING_FIELDS = `
    general {
      appName
      supportEmail
      supportPhone
      currency
      afterNightHours {
        start
        end
      }
    }
    location {
      pickupRadius
      locationUpdateInterval
    }
    ride {
      baseFare
      ratePerKm
      ratePerKmAfterNight
      cancelationTimeLimit
      maxRideDistance
      rideRequestTimeout
    }
    payment {
      paymentMethods
      taxRate
      driverCommission
    }
    user {
      requireKyc
      requireDriverApproval
    }
    notification {
      enableSms
      enablePush
      enableEmail
    }
    templates {
      driverAssigned
      rideCanceled
    }
`;

export const GET_SETTING = gql`
  query getSetting {
    getSetting {
      ${SETTING_FIELDS}
    }
  }
`;
