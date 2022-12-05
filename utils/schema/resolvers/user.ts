import { MongoClient, ObjectId } from 'mongodb';
import { hashPassword, verifyPassword } from '../../lib/bcrypt';
import clientDB from '../../lib/mongoClient';

const userResolver = {
  Query: {
    async findExistingUser(_parent: null, { data: userData }: {
      data: {
        id: string;
        email: string;
      }
    }) {
      const getClient = await clientDB('Auth') as MongoClient;
      const db = getClient.db();

      let userExists;
      try {
        userExists = await db.collection('user').findOne({ email: userData.email });
      } catch (error) {
        return error;
      }

      getClient.close();
      return userExists;
    },
    async connectUser(_parent: null, { data: passwords }: any) {
      const isPasswordValid = await verifyPassword(passwords.password, passwords.dbPassword);

      return { isValid: isPasswordValid ? isPasswordValid : null };
    },
  },
  Mutation: {
    async createUser(_parent: null, { data: userData }: any) {
      const getClient = await clientDB('Auth') as MongoClient;
      const db = getClient.db();

      const hasedPassword = await hashPassword(userData.password);
      const newUser: {
        email: string,
        password: string,
        id?: ObjectId
      } = {
        email: userData.email,
        password: hasedPassword,
      };

      try {
        const userExists = await db.collection('user').findOne({ email: newUser.email });
        if (!userExists) {
          const result = await db.collection('user').insertOne(newUser);
          newUser.id = result.insertedId;
        }
      } catch (error) {
        return error;
      }

      getClient.close();
      return newUser;
    },
  },
};

export default userResolver;
