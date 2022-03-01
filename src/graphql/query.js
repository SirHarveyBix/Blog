import { gql } from '@apollo/client';
import { POST_PART } from './fragments';

export const ALL_POSTS = gql`
  query GetAllPosts {
    getAllPosts {
      isFeatured
      ...PostParts
    }
  }
  ${POST_PART}
`;

export const FEATURED_POSTS = gql`
  query GetFeaturedPosts {
    getFeaturedPosts {
      isFeatured
      ...PostParts
    }
  }
  ${POST_PART}
`;

export const POST_DETAILS = gql`
  query GetPostDetails($data: PostInput) {
    getPostDetails(data: $data) {
      content
      ...PostParts
    }
  }
  ${POST_PART}
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($data: SendMessageInput) {
    sendMessage(data: $data) {
      name
      email
      message
      id
    }
  }
`;