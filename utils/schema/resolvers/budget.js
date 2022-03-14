import 'dotenv/config';

import pkg from 'mongodb';
const { MongoClient, ObjectID } = pkg;

const isOnProd =
  process.env.NODE_ENV === 'production' ? process.env.BUDGET_DB_PROD : process.env.BUDGET_DB_DEV;
const connectionString = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTER}.wyrhp.mongodb.net/${isOnProd}?retryWrites=true&w=majority`;

const budgetResolver = {
  Query: {
    async getAllBudget(_parent, { data: FindUserEmail }) {
      let client;
      try {
        client = await MongoClient.connect(connectionString);
      } catch (error) {
        return error;
      }
      const db = client.db();

      let data = [];
      try {
        const results = await db
          .collection('budget')
          .find({
            'author.email': FindUserEmail.email,
          })
          .toArray();

        results.map((item) => {
          return data.push({
            id: item._id,
            amount: item.amount,
            label: item.label,
            author: item.author?.map((element) => ({
              ...element,
            })),
          });
        });
      } catch (error) {
        console.error(error);
        return error;
      }
      client.close();

      return data;
    },
  },
  Mutation: {
    // TODO : is mandatory to check if, and which user is connected !
    async createBudgetLine(_parent, { data: BudgetInput }) {
      let client;
      try {
        client = await MongoClient.connect(connectionString);
      } catch (error) {
        return error;
      }

      const db = client.db();
      try {
        const result = await db.collection('budget').insertOne(BudgetInput);
        BudgetInput.id = result.insertedId;
      } catch (error) {
        return error;
      }

      client.close();
      return BudgetInput;
    },
    async removeBudgetById(_parent, { data: BudgetIdInput }) {
      let client;
      try {
        client = await MongoClient.connect(connectionString);
      } catch (error) {
        return error;
      }

      const db = client.db();
      let result;
      try {
        result = await db.collection('budget').deleteOne({ _id: new ObjectID(BudgetIdInput.id) });
      } catch (error) {
        return error;
      }

      if (result.deletedCount === 1) return BudgetIdInput;
      client.close();
      return;
    },
    async updateBudgetById(_parent, { data: BudgetInput }) {
      let client;
      try {
        client = await MongoClient.connect(connectionString);
      } catch (error) {
        return error;
      }

      const db = client.db();
      let result;
      try {
        result = await db
          .collection('budget')
          .updateOne(
            { _id: new ObjectID(BudgetInput.id) },
            { $set: { amount: Number(BudgetInput?.amount), label: String(BudgetInput?.label) } }
          );
      } catch (error) {
        return error;
      }

      if (result.modifiedCount === 1) return BudgetInput;
      client.close();
      return;
    },
  },
};
export default budgetResolver;
