import dotenv from 'dotenv/config';
import { MongoClient } from 'mongodb';

const contactResolver = {
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

export default contactResolver;
