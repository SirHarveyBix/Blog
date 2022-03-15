import { hashPassword, verifyPassword } from '../../lib/bcript.js';
import clientDB from '../../lib/mongoClient.js';

const userResolver = {
  Query: {
    async findExistingUser(_parent, { data: userData }) {
      const getClient = await clientDB('Auth');
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
    async connectUser(_parent, { data: passwords }) {
      const isPasswordValid = await verifyPassword(passwords.password, passwords.dbPassword);

      return { isValid: isPasswordValid ? isPasswordValid : null };
    },
  },
  Mutation: {
    async createUser(_parent, { data: userData }) {
      const getClient = await clientDB('Auth');
      const db = getClient.db();

      const hasedPassword = await hashPassword(userData.password);
      const newUser = {
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
