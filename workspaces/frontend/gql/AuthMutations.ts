import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      email
      token
      tokenExpirationHours
      error
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($email: String!, $phoneNumber: String!, $password: String!) {
    signup(email: $email, phoneNumber: $phoneNumber, password: $password) {
      ok
      token
      tokenExpirationHours
      error
    }
  }
`;

export const CHANGE_PASSWORD_REQUEST = gql`
  mutation ChangePasswordRequest($email: String!) {
    changePasswordRequest(email: $email) {
      ok
      error
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword(
    $newPassword: String!
    $changePasswordToken: String!
  ) {
    changePassword(
      newPassword: $newPassword
      changePasswordToken: $changePasswordToken
    ) {
      ok
      error
    }
  }
`;
