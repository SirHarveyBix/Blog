import { MongoClient } from 'mongodb';

const clientDB = async (db: string): Promise<MongoClient | unknown> => {
  let chosenDB: string | undefined;
  if (db === 'Budget') {
    chosenDB =
      PRODUCTION_ENV() === 'production'
        ? BUDGET_DB_PROD()
        : BUDGET_DB_DEV();
  }
  if (db === 'Contact') {
    chosenDB = PRODUCTION_ENV() === 'production' ? DB_PROD() : DB_DEV();
  }
  if (db === 'Auth') {
    chosenDB =
      PRODUCTION_ENV() === 'production' ? AUTH_DB_PROD() : AUTH_DB_DEV();
  }
  const connectionString = `mongodb+srv://${USERNAME()}:${PASSWORD()}@${CLUSTER()}.wyrhp.mongodb.net/${chosenDB}?retryWrites=true&w=majority`;

  console.log("XXXXXXX", connectionString)

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

export const BUDGET_DB_PROD = () => {
  if (process.env.BUDGET_DB_PROD != null) {
    return process.env.BUDGET_DB_PROD
  }
}

export const BUDGET_DB_DEV = () => {
  if (process.env.BUDGET_DB_DEV != null) {
    return process.env.BUDGET_DB_DEV
  }
}

export const PRODUCTION_ENV = () => {
  if (process.env.NODE_ENV != null) {
    return process.env.NODE_ENV
  }
}

export const DB_PROD = () => {
  if (process.env.DB_PROD != null) {
    return process.env.DB_PROD
  }
}

export const DB_DEV = () => {
  if (process.env.DB_DEV != null) {
    return process.env.DB_DEV
  }
}

export const AUTH_DB_PROD = () => {
  if (process.env.AUTH_DB_PROD != null) {
    return process.env.AUTH_DB_PROD
  }
}

export const AUTH_DB_DEV = () => {
  if (process.env.AUTH_DB_DEV != null) {
    return process.env.AUTH_DB_DEV
  }
}

export const USERNAME = () => {
  if (process.env.USERNAME != null) {
    return process.env.USERNAME
  }
}

export const PASSWORD = () => {
  if (process.env.PASSWORD != null) {
    return process.env.PASSWORD
  }
}

export const CLUSTER = () => {
  if (process.env.CLUSTER != null) {
    return process.env.CLUSTER
  }
}

export const APOLLO_GRAPH_REF = () => {
  if (process.env.APOLLO_GRAPH_REF != null) {
    return process.env.APOLLO_GRAPH_REF
  }
}
