import { gql } from "@apollo/client";

export const CREATE_RESERVATION = gql`
  mutation(
    $timestamp: String!
    $spotId: String!
    $kayakReservations: [KayakReservationInput!]
    $paymentId: String!
  ) {
    createReservation(
      timestamp: $timestamp
      spotId: $spotId
      kayakReservations: $kayakReservations
      paymentId: $paymentId
    ) {
      reservationID
      error
    }
  }
`;
