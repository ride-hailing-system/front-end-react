import { gql } from '@apollo/client';

export const USER_FIELDS = `
  _id
  firstName
  lastName
  role
  email
  phoneNumber
  photoUrl
  createdAt
  updatedAt`;

export const GET_USER_BY_ID = gql`
  query GetUserById($userId: String!) {
    user(userId: $userId) {
      ${USER_FIELDS}
    }
  }
`;

export const GET_USERS = gql`
  query getAllUsers($role: String!) {
    getAllUsers(role: $role) {
      ${USER_FIELDS}
    }
  }
`;



