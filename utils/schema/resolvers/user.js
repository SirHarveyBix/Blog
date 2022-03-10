import dotenv from 'dotenv/config';
import { MongoClient } from 'mongodb';

import { hashPassword, verifyPassword } from '../../lib/bcript.js';

const userResolver = {
  Query: {
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

      client.close();
      return userExists;
    },
    async connectUser(_parent, { data: passwords }) {
      const isPasswordValid = await verifyPassword(passwords.password, passwords.dbPassword);

      return { isValid: isPasswordValid ? isPasswordValid : null };
    },
  },
  Mutation: {
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
      client.close();

      return newUser;
    },
  },
};

export default userResolver;
