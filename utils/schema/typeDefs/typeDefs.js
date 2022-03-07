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
  input QueryInput {
    input: String
  }
  type NewMessage {
    id: ID
    name: String
    email: String
    message: String
  }
  input PostInput {
    slug: String
  }
  input SendMessageInput {
    name: String
    email: String
    message: String
  }

  type Query {
    getAllPosts: [Post!]!
    getFeaturedPosts: [Post!]!
    getPostDetails(data: PostInput): Post!
    searchQuery(filter: QueryInput): [Post]
  }

  type User {
    id: ID
    email: String
    password: String
  }

  input CreateUser {
    email: String
    password: String
  }

  input FindUserEmail {
    email: String
  }

  type Query {
    findExistingUser(data: FindUserEmail): Boolean
  }

  type Mutation {
    sendMessage(data: SendMessageInput): NewMessage
    createUser(data: CreateUser): User
  }
`;
