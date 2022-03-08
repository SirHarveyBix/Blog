import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Post {
    slug: String
    title: String
    date: String
    image: String
    excerpt: String
    isFeatured: Boolean
    content: String
  }
  input PostInput {
    slug: String
  }
  input QueryInput {
    input: String
  }

  type NewMessage {
    id: ID
    name: String
    email: String
    message: String
  }
  input SendMessageInput {
    name: String
    email: String
    message: String
  }

  input CreateUserInput {
    email: String
    password: String
  }
  type User {
    _id: ID
    email: String
    password: String
  }
  type ExisitingUser {
    _id: ID
  }
  input FindUserEmail {
    email: String
  }

  type Query {
    getAllPosts: [Post!]!
    getFeaturedPosts: [Post!]!
    getPostDetails(data: PostInput): Post!
    searchQuery(filter: QueryInput): [Post]
    findExistingUser(data: FindUserEmail): ExisitingUser
  }
  type Mutation {
    sendMessage(data: SendMessageInput): NewMessage
    createUser(data: CreateUserInput): User
  }
`;
