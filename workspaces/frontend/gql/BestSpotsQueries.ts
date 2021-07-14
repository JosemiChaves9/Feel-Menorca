import { gql } from "@apollo/client";

export const GET_BEST_SPOTS = gql`
  query($query: SpotsQuery, $limit: Int) {
    spots(query: $query, limit: $limit) {
      title
      mainImageUrl
      slug
    }
  }
`;
