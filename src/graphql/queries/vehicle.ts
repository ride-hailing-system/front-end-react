import { gql } from '@apollo/client';

export const VEHICLE_FIELDS = `
  _id
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
  query getVehicleById($_id: String!) {
    getVehicleById(_id: $_id) {
      ${VEHICLE_FIELDS}
    }
  }
`;

export const GET_VEHICLES = gql`
  query getAllVehicles {
    getAllVehicles {
      ${VEHICLE_FIELDS}
    }
  }
`;



