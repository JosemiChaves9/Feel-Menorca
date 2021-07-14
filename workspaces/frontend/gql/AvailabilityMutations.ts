import { gql } from '@apollo/client';

export const ADD_AVAILABILITY = gql`
  mutation AddAvailability(
    $startOfDateRangeProvided: String!
    $endOfDateRangeProvided: String!
    $kayakType: String!
    $numKayakAvailability: String!
  ) {
    addAvailability(
      startOfDateRangeProvided: $startOfDateRangeProvided
      endOfDateRangeProvided: $endOfDateRangeProvided
      kayakType: $kayakType
      numKayakAvailability: $numKayakAvailability
    ) {
      ok
      error
    }
  }
`;
