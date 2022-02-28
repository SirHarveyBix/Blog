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
  input PostInput {
    slug: String
  }
  input isFeaturedPostInput {
    isFeatured: Boolean
  }
  # Query :
  type Query {
    getAllPosts: [Post!]!
    getFeaturedPosts(data: isFeaturedPostInput): [Post!]!
    getPostDetails(data: PostInput): Post!
  }
`;

export default typeDefs;
