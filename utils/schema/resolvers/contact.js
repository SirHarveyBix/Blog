import clientDB from '../../lib/mongoClient.js';

const contactResolver = {
  Mutation: {
    async sendMessage(_parent, { data: newMessage }, context, info) {
      const getClient = await clientDB('Contact');
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
