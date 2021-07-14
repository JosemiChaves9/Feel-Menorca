import { gql } from "@apollo/client";

export const GET_SPOTS_LOCATIONS = gql`
  query GetLocations {
    spots {
      description
      location{
          lat
          lng
      }
    }
  }
`;
