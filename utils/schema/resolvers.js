import dotenv from 'dotenv/config';
import fs from 'fs';
import matter from 'gray-matter';
import { MongoClient } from 'mongodb';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'posts');

const getPostsFiles = () => {
  return fs.readdirSync(postsDirectory);
};

export const getPostData = (postIdentifier) => {
  const postSlug = postIdentifier.replace(/\.md$/, '');

  const filePath = path.join(postsDirectory, `${postSlug}.md`);

  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const { data, content } = matter(fileContent);
  const postData = { slug: postSlug, ...data, content };

  return postData;
};

const resolvers = {
  Query: {
    getAllPosts() {
      const postFiles = getPostsFiles();
      const allPosts = postFiles.map((postFile) => {
        return getPostData(postFile);
      });
      return allPosts;
    },
    getFeaturedPosts() {
      const postFiles = getPostsFiles();
      const allPosts = postFiles.map((postFile) => {
        return getPostData(postFile);
      });

      const sortedPosts = allPosts.sort((postA, postB) => (postA.date > postB.date ? -1 : 1));
      const featuredPosts = sortedPosts.filter((post) => post.isFeatured);

      return featuredPosts;
    },
    getPostDetails(_parent, { data: { slug } }) {
      const filePath = path.join(postsDirectory, `${slug}.md`);
      const fileContent = fs.readFileSync(filePath, 'utf-8');

      const postSlug = slug.replace(/\.md$/, '');
      const { data, content } = matter(fileContent);
      const postData = { slug: postSlug, ...data, content };

      return postData;
    },
  },
  Mutation: {
    async sendMessage(_parent, { data: newMessage }, context, info) {
      const isOnProd =
        process.env.NODE_ENV === 'production' ? process.env.DB_PROD : process.env.DB_DEV;

      const connectionString = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTER}.wyrhp.mongodb.net/${isOnProd}?retryWrites=true&w=majority`;

      let client;
      try {
        client = await MongoClient.connect(connectionString);
      } catch (error) {
        return error;
      }

      const db = client.db();
      try {
        const result = await db.collection('messages').insertOne(newMessage);
        newMessage.id = result.insertedId;
      } catch (error) {
        return error;
      }

      client.close();
      return newMessage;
    },
  },
};
export default resolvers;
