import dotenv from 'dotenv/config';
import fs from 'fs';
import matter from 'gray-matter';
import { MongoClient } from 'mongodb';
import path from 'path';

import { hashPassword } from '../../lib/bcript.js';

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

export const resolvers = {
  Query: {
    getAllPosts() {
      const postFiles = getPostsFiles();
      const allPosts = postFiles.map((postFile) => {
        return getPostData(postFile);
      });
      return allPosts;
    },
    searchQuery(_parent, { filter: { input } }) {
      const postFiles = getPostsFiles();
      const allPosts = postFiles.map((postFile) => {
        return getPostData(postFile);
      });

      const requestedPosts = allPosts.filter((post) => JSON.stringify(post).includes(input));
      return requestedPosts;
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

    async findExistingUser(_parent, { data: userData }) {
      const isOnProd =
        process.env.NODE_ENV === 'production' ? process.env.AUTH_DB_PROD : process.env.AUTH_DB_DEV;
      const connectionString = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTER}.wyrhp.mongodb.net/${isOnProd}?retryWrites=true&w=majority`;

      let client;
      try {
        client = await MongoClient.connect(connectionString);
      } catch (error) {
        return error;
      }

      const db = client.db();
      let userExists;
      try {
        userExists = await db.collection('user').findOne({ email: userData.email });
      } catch (error) {
        return error;
      }

      return !!userExists;
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

    async createUser(_parent, { data: userData }) {
      const isOnProd =
        process.env.NODE_ENV === 'production' ? process.env.AUTH_DB_PROD : process.env.AUTH_DB_DEV;
      const connectionString = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTER}.wyrhp.mongodb.net/${isOnProd}?retryWrites=true&w=majority`;

      let client;
      try {
        client = await MongoClient.connect(connectionString);
      } catch (error) {
        return error;
      }

      const hasedPassword = await hashPassword(userData.password);
      const newUser = {
        email: userData.email,
        password: hasedPassword,
      };

      const db = client.db();
      try {
        const userExists = await db.collection('user').findOne({ email: newUser.email });
        if (!userExists) {
          const result = await db.collection('user').insertOne(newUser);
          newUser.id = result.insertedId;
        }
      } catch (error) {
        return error;
      }

      return newUser;
    },
  },

  // Query: {
  //   getAllUsers() {},
  // },
};
