import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

import { EXISTING_USER } from '/src/graphql/query';
console.log('ok');

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      async authoize(credentials) {
        console.log('ok');
        // try {
        const isExistingUser = await client.mutate({
          query: EXISTING_USER,
          variables: { data: credentials.email },
        });
        console.log(isExistingUser);
        // } catch (error) {
        //   response.status(500).json({ message: 'could not connect to mongo DB !' });
        //   return;
        // }
        console.log('credentials', credentials);
      },
    }),
  ],
});
