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

export const EXISTING_USER = gql`
  query FindExistingUser($data: FindUserEmail) {
    findExistingUser(data: $data) {
      _id
      email
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($data: UserInput) {
    createUser(data: $data) {
      id
      email
    }
  }
`;

export const CONNECT_USER = gql`
  query ConnectUser($data: PasswordInput) {
    connectUser(data: $data) {
      isValid
    }
  }
`;
