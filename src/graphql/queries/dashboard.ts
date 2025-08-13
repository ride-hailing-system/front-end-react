import { gql } from '@apollo/client';

export const GET_DASHBOARD_DATA = gql`
  query getDashboardDatas {
    getDashboardDatas {
      cardsCount {
        drivers {
          total
          available
        }
        rideRequests {
          completed
          canceled
        }
        weeklyRegistration {
          drivers
          riders
        }
      }
      weeklyRideRequests {
        completed
        canceled
        rejected
        accepted
      }
      monthlyRideRequests {
        completed
        canceled
        rejected
        accepted
      }
      dailyRideRequests {
        driverInfo {
          firstName
          lastName
          photoUrl
        }
        riderInfo {
          firstName
          lastName
          photoUrl
        }
        fare
        requestedAt
        status
        completedAt
      }
    }
  }
`;
