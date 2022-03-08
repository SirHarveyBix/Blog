import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { EXISTING_USER } from '/src/graphql/query';

console.log('before NextAuth');

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      async authoize(credentials) {
        const client = await connectToDatabase();
        const userCollection = client.db().collection('user');

        const user = await userCollection.findOne({ email: credentials.email });
        if (!user) {
          client.close();
          throw new Error('No user Found !');
        }

        const isValid = await verifyPassword(credentials.password, user.password);
        if (!isValid) {
          client.close();
          throw new Error('Could not log you in');
        }

        client.close();
        return { email: user.email };
        // console.log('inside NextAuth');
        // // try {
        // const isExistingUser = await client.mutate({
        //   query: EXISTING_USER,
        //   variables: { data: credentials.email },
        // });
        // console.log(isExistingUser);
        // // } catch (error) {
        // //   response.status(500).json({ message: 'could not connect to mongo DB !' });
        // //   return;
        // // }
        // console.log('credentials', credentials);
      },
    }),
  ],
});
