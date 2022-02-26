import { gql } from 'apollo-server-express';

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
  input PostInput {
    slug: String
  }
  # Query :
  type Query {
    getAllPosts: [Post!]!
    getFeaturedPosts: [Post!]!
    getPost(data: PostInput): Post!
  }
`;

export default typeDefs;
