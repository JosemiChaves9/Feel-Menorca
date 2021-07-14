import { gql } from '@apollo/client';

export const GET_RESERVATIONS = gql`
  query getReservations {
    reservations {
      _id
      timestamp
      userId
      spotId
      spotName
      spotImageUrl
      spotSlug
      kayakReservations {
        kayakType
        duration
      }
      priceEur
    }
  }
`;
