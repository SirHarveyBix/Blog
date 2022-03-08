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

  #### contact
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

  ### user Handling
  type User {
    id: ID
    email: String
  }
  type UserConnection {
    isValid: Boolean
  }
  type ExisitingUser {
    _id: ID
    email: String
  }
  input FindUserEmail {
    email: String
  }
  input UserInput {
    email: String
    password: String
  }
  input PasswordInput {
    dbPassword: String
    password: String
  }
  type Query {
    getAllPosts: [Post!]!
    getFeaturedPosts: [Post!]!
    getPostDetails(data: PostInput): Post!
    searchQuery(filter: QueryInput): [Post]

    findExistingUser(data: FindUserEmail): ExisitingUser
    connectUser(data: PasswordInput): UserConnection
  }
  type Mutation {
    sendMessage(data: SendMessageInput): NewMessage
    createUser(data: UserInput): User
  }
`;
