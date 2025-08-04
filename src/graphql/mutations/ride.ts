import { gql } from '@apollo/client';

export const RIDE_FIELDS = `
  _id
  rider
  driver
  phoneNumber
  fullName
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
  createdByAdmin
  requestNumber
  createdAt
  updatedAt
`;

export const CREATE_RIDE = gql`
  mutation createRide(
    $rider: String
    $phoneNumber: String
    $fullName: String
    $pickupLocation: GeoLocationInput!
    $dropoffLocation: GeoLocationInput!
    $fare: Float
    $createdByAdmin: Boolean
    $requestNumber: String!
  ) {
    createRide(
      rider: $rider
      phoneNumber: $phoneNumber
      fullName: $fullName
      pickupLocation: $pickupLocation
      dropoffLocation: $dropoffLocation
      fare: $fare
      status: $status
      createdByAdmin: $createdByAdmin
      requestNumber: $requestNumber
    ) {
      ${RIDE_FIELDS}
    }
  }
`;

export const UPDATE_RIDE = gql`
  mutation updateRide(
    $_id: String!
    $rider: String
    $driver: String
    $phoneNumber: String
    $fullName: String
    $pickupLocation: GeoLocationInput
    $dropoffLocation: GeoLocationInput
    $fare: Float
    $status: String
    $createdByAdmin: Boolean
  ) {
    updateRide(
      _id: $_id
      rider: $rider
      driver: $driver
      phoneNumber: $phoneNumber
      fullName: $fullName
      pickupLocation: $pickupLocation
      dropoffLocation: $dropoffLocation
      fare: $fare
      status: $status
      createdByAdmin: $createdByAdmin
    ) {
      ${RIDE_FIELDS}
    }
  }
`;


export const DELETE_RIDE = gql`
  mutation deleteRide($_id: String!) {
    deleteRide(_id: $_id) {
      _id
    }
  }
`;

