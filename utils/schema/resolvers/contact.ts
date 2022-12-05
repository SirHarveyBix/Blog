import { MongoClient, ObjectId } from 'mongodb';
import clientDB from '../../lib/mongoClient';

const contactResolver = {
  Mutation: {
    async sendMessage(_parent: undefined, { data: newMessage }: {
      data: {
        id: ObjectId;
        name: string;
        email: string;
        message: string;
      }
    }, _context: null, _info: any) {
      const getClient = await clientDB('Contact') as MongoClient;
      const db = getClient.db();

      try {
        const result = await db.collection('messages').insertOne(newMessage);
        newMessage.id = result.insertedId;
      } catch (error) {
        return error;
      }

      getClient.close();
      return newMessage;
    },
  },
};

export default contactResolver;
