import { gql } from '@apollo/client';
export const VEHICLE_FIELDS = `
  _id
  vehicleType
  plateNumber
  vehicleModel
  size
  color
  vin
  vehicleImage
  isDriverOwner
  ownerInfo {
    firstName
    lastName
    phoneNumber
  }
  driver
  createdAt
  updatedAt`;

  export const CREATE_VEHICLE = gql`
  mutation CreateVehicle(
    $driver: String!
    $vehicleType: String!
    $plateNumber: String!
    $vehicleModel: String!
    $size: String!
    $color: String!
    $vin: String!
    $isDriverOwner: Boolean!
    $ownerInfo: OwnerInfoInput
  ) {
    createVehicle(
      driver: $driver
      vehicleType: $vehicleType
      plateNumber: $plateNumber
      vehicleModel: $vehicleModel
      size: $size
      color: $color
      vin: $vin
      isDriverOwner: $isDriverOwner
      ownerInfo: $ownerInfo
    ) {
      ${VEHICLE_FIELDS}
    }
  }
`;


export const UPDATE_VEHICLE = gql`
  mutation UpdateVehicle(
    $_id: String!
    $driver: String!
    $vehicleType: String!
    $plateNumber: String!
    $vehicleModel: String!
    $size: String!
    $color: String!
    $vin: String!
    $isDriverOwner: Boolean!
    $ownerInfo: OwnerInfoInput
  ) {
    updateVehicle(
      _id: $_id
      driver: $driver
      vehicleType: $vehicleType
      plateNumber: $plateNumber
      vehicleModel: $vehicleModel
      size: $size
      color: $color
      vin: $vin
      isDriverOwner: $isDriverOwner
      ownerInfo: $ownerInfo
    ) {
      ${VEHICLE_FIELDS}
    }
  }
`;

export const DELETE_VEHICLE = gql`
  mutation DeleteVehicle($vehicleId: String!) {
    deleteVehicle(vehicleId: $vehicleId) {
      _id
    }
  }
`;

