import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      firstName
      lastName
      phoneNumber
      email
      role
      status
    }
  }
`;

export const FORGET_PASSWORD = gql`
  query ForgetPassword($email: String!) {
    forgetPassword(email: $email) {
      message
    }
  }
`;

export const GET_CURRENT_DATE = gql`
  query getCurrentDate {
    getCurrentDate {
      text
      value
    }
  }
`;


export const GET_SESSION_BY_ID = gql`
  query getSessionById {
    getSessionById {
      _id
      sessionId
      user {
        _id
        firstName
        lastName
        email
        role
      }
      token
      createdAt
    }
  }
`;


export const LOGOUT = gql`
  query logout {
    logout {
      _id
    }
  }
`;