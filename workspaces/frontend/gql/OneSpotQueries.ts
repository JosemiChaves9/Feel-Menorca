import { gql } from "@apollo/client";

export const SPOT = gql`
  query GetSpot($_id: String, $slug: String) {
    spot(_id: $_id, slug: $slug) {
      _id
      title
      description
      mainImageUrl
      locationName
      imageUrls {
        imageUrl
      }
      location {
        lat
        lng
      }
      kayakTypes {
        name
        description
        pax
        pricing {
          from
          to
          durationName
          durationDescription
          priceEur
        }
      }
    }
  }
`;
