import { gql } from '@apollo/client';
import { POST_PART } from './fragments';

export const ALL_POSTS = gql`
  query GetAllPosts {
    getAllPosts {
      ...PostParts
      isFeatured
    }
  }
  ${POST_PART}
`;

export const POST = gql`
  query GetPost($data: PostInput) {
    getPost(data: $data) {
      ...PostParts
      content
    }
  }
  ${POST_PART}
`;

export const FEATURED_POSTS = gql`
  query GetFeaturedPosts {
    getFeaturedPosts {
      ...PostParts
    }
  }
  ${POST_PART}
`;
