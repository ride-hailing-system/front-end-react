import { gql } from '@apollo/client';

export const GET_DRIVER_DETAIL = gql`
  query getDriverDetail($userId: String!) {
    getDriverDetail(userId: $userId) {
      _id
      userInfo {
        _id
        firstName
        lastName
        phoneNumber
        email
        photoUrl
      }
      vehicleInfo {
        _id
        vehicleType
        plateNumber
        vehicleModel
        size
        color
        vin
        vehicleImage
        ownerInfo {
          firstName
          lastName
          phoneNumber
        }
      }
      rides {
        _id
        status
        fare
        requestedAt
        completedAt
        riderInfo {
          _id
          firstName
          lastName
          phoneNumber
        }
      }
    }
  }
`;
