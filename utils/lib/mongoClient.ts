import { MongoClient } from 'mongodb';

const clientDB = async (db: string): Promise<MongoClient | unknown> => {
  let chosenDB: string | undefined;
  if (db === 'Budget') {
    chosenDB =
      process.env.NODE_ENV === 'production'
        ? process.env.BUDGET_DB_PROD
        : process.env.BUDGET_DB_DEV;
  }
  if (db === 'Contact') {
    chosenDB = process.env.NODE_ENV === 'production' ? process.env.DB_PROD : process.env.DB_DEV;
  }
  if (db === 'Auth') {
    chosenDB =
      process.env.NODE_ENV === 'production' ? process.env.AUTH_DB_PROD : process.env.AUTH_DB_DEV;
  }
  const connectionString = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTER}.wyrhp.mongodb.net/${chosenDB}?retryWrites=true&w=majority`;

  let client: MongoClient;
  try {
    client = await MongoClient.connect(connectionString);
  } catch (error) {

    console.error(error);
    return error;
  }

  return client;
};

export default clientDB;
