import { gql } from 'apollo-server';

const typeDefs = gql`
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
  # Query :
  type Query {
    getAllPosts: [Post!]!
    getFeaturedPosts: [Post!]!
    getPostDetails(data: PostInput): Post!
    searchQuery(filter: QueryInput): [Post]
  }
  type Mutation {
    sendMessage(data: SendMessageInput): NewMessage
  }
`;

export default typeDefs;
