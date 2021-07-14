import { gql } from '@apollo/client';

export const GET_AVAILABILITY = gql`
  query Availability($selectedMonth: String!) {
    availability(selectedMonth: $selectedMonth) {
      _id
      spotId
      date
      kayakType
      numKayakAvailability
    }
  }
`;
