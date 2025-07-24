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

export const CREATE_USER = gql`
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $email: String
    $phoneNumber: String
    $password: String!
    $role: String
    ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      phoneNumber: $phoneNumber
      password: $password
      role: $role
    ) {
      ${USER_FIELDS}
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $_id: String!
    $firstName: String
    $lastName: String
    $phoneNumber: String
    $email: String
    $role: String
    $status: String
  ) {
    updateUser(
      _id: $_id
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
      email: $email
      role: $role
      status: $status
    ) {
      ${USER_FIELDS}
    }
  }
`;

export const UPDATE_USER_PASSWORD = gql`
  mutation UpdateUserPassword($_id: String!, $password: String!) {
    updateUserPassword(_id: $_id, password: $password) {
      _id
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($userId: String!) {
    deleteUser(userId: $userId) {
      _id
    }
  }
`;
