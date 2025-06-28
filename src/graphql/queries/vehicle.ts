import { gql } from '@apollo/client';

export const VEHICLE_FIELDS = `
  vehicleType
  plateNumber
  vehicleModel
  size
  color
  driverInfo {
    _id
    firstName
    lastName
    role
    email
    phoneNumber
    photoUrl
    createdAt
    updatedAt
  }`;

export const GET_VEHICLE_BY_ID = gql`
  query GetUserById($userId: String!) {
    vehicle(userId: $userId) {
      ${VEHICLE_FIELDS}
    }
  }
`;

export const GET_VEHICLES = gql`
  query GetAllUsers {
    vehicles {
      ${VEHICLE_FIELDS}
    }
  }
`;



