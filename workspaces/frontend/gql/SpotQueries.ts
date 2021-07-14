import { gql } from "@apollo/client";

export const GET_SPOTS = gql`
  query {
    spots {
      title
      slug
    }
  }
`;
