import { gql } from '@apollo/client';

export const POST_PART = gql`
  fragment PostParts on Post {
    slug
    title
    date
    image
    excerpt
  }
`;
