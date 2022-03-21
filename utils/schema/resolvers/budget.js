import { ObjectID } from 'mongodb';

import clientDB from '../../lib/mongoClient.js';

const budgetResolver = {
  Query: {
    async getAllBudget(_parent, { data: FindUserById }) {
      const getClient = await clientDB('Budget');
      const db = getClient.db();

      let data = [];
      try {
        const results = await db
          .collection('budget')
          .find({
            'author.id': FindUserById.id,
          })
          .toArray();

        results.map((item) => {
          return data.push({
            id: item._id,
            amount: item.amount,
            label: item.label,
            author: item.author.map((element) => ({
              ...element,
            })),
          });
        });
      } catch (error) {
        return error;
      }

      getClient.close();
      return data;
    },
  },
  Mutation: {
    // TODO : is mandatory to check if, and which user is connected !
    async createBudgetLine(_parent, { data: BudgetInput }) {
      const getClient = await clientDB('Budget');
      const db = getClient.db();
      try {
        const result = await db.collection('budget').insertOne(BudgetInput);
        BudgetInput.id = result.insertedId;
      } catch (error) {
        return error;
      }

      getClient.close();
      return BudgetInput;
    },
    async removeBudgetById(_parent, { data: BudgetIdInput }) {
      const getClient = await clientDB('Budget');
      const db = getClient.db();

      let result;
      try {
        result = await db.collection('budget').deleteOne({ _id: new ObjectID(BudgetIdInput.id) });
      } catch (error) {
        return error;
      }
      if (result.deletedCount === 1) return BudgetIdInput;

      getClient.close();
      return;
    },
    async updateBudgetById(_parent, { data: BudgetInput }) {
      const getClient = await clientDB('Budget');
      const db = getClient.db();

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

      getClient.close();
      return;
    },
  },
};
export default budgetResolver;
