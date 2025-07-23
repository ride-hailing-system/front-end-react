import { gql } from '@apollo/client';

export const RIDE_FIELDS = `
  _id
  riderInfo {
    _id
    firstName
    lastName
    photoUrl
  }
  driverInfo {
    _id
    firstName
    lastName
    photoUrl
  }
  pickupLocation {
    type
    coordinates
  }
  dropoffLocation {
    type
    coordinates
  }
  fare
  status
  requestedAt
  completedAt
`;

export const GET_RIDES_BY_ID = gql`
  query GetRidesById($_id: String!) {
    ride(_id: $_id) {
      ${RIDE_FIELDS}
    }
  }
`;

export const GET_RIDES = gql`
  query getAllRides($limit: Int!) {
    getAllRides(limit: $limit) {
      ${RIDE_FIELDS}
    }
  }
`;
export const GET_RIDES_BY_DRIVER_ID = gql`
  query GetRidesByDriverId($driverId: String!) {
    rides(driverId: $driverId) {
      ${RIDE_FIELDS}
    }
  }
`;
export const GET_RIDES_BY_RIDER_ID = gql`
  query GetRidesByRiderId($riderId: String!) {
    rides(riderId: $riderId) {
      ${RIDE_FIELDS}
    }
  }
`;


