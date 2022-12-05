import { MongoClient, ObjectId, ObjectID, } from 'mongodb';

import clientDB from '../../lib/mongoClient';

const budgetResolver = {
  Query: {
    async getAllBudget(_parent: undefined, { data: FindUserById }: { data: { id: string } }) {
      const getClient = await clientDB('Budget') as MongoClient
      const db = getClient.db();

      let data: { id: ObjectId; amount: number; label: string; author: { id: ObjectId }[] }[] = [];
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
            author: item.author.map((element: any) => ({
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
    async createBudgetLine(_parent: undefined, { data: BudgetInput }: { data: { id: ObjectId } }) {

      const getClient = await clientDB('Budget') as MongoClient;
      const db = getClient.db()
      try {
        const result = await db.collection('budget').insertOne(BudgetInput);
        BudgetInput.id = result.insertedId;
      } catch (error) {
        return error;
      }

      getClient.close();
      return BudgetInput;
    },
    async removeBudgetById(_parent: undefined, { data: BudgetIdInput }: { data: { id: ObjectId } }) {
      const getClient = await clientDB('Budget') as MongoClient;
      const db = getClient.db();

      let result: { deletedCount: number; };
      try {
        result = await db.collection('budget').deleteOne({ _id: new ObjectID(BudgetIdInput.id) });
      } catch (error) {
        return error;
      }
      if (result.deletedCount === 1) return BudgetIdInput;

      getClient.close();
      return;
    },
    async updateBudgetById(_parent: undefined, { data: BudgetInput }: { data: { id: ObjectId, amount: number, label: string } }) {
      const getClient = await clientDB('Budget') as MongoClient;
      const db = getClient.db();

      let result: { modifiedCount: number; };
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
