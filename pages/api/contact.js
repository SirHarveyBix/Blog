import { MongoClient } from 'mongodb';

export default async function handler(request, response) {
  if (request.method === 'POST') {
    const { email, name, message } = request.body;

    if (
      !email ||
      !name ||
      !message ||
      !email.includes('@') ||
      name.trim() === '' ||
      message.trim() === ''
    ) {
      response.status(422).json({ message: 'Invalid input' });
      return;
    }

    const newMessage = { email, name, message };

    let client;

    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.wyrhp.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      response.status(500).json({ message: 'could not connect to mongo DB !' });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection('messages').insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      response.status(500).json({ message: 'Storing message Faild !' });
      return;
    }

    client.close();
    response.status(201).json({ message: 'Successfully Sent !', message: newMessage });
  }
}
