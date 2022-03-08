import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { CONNECT_USER, EXISTING_USER } from '/src/graphql/query';

import client from '../graphql';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const existingUser = await client.query({
          query: EXISTING_USER,
          variables: { data: { email: credentials.email } },
        });
        if (!existingUser.data.findExistingUser?._id) {
          throw new Error('No user Found !');
        }

        const connectUser = await client.query({
          query: CONNECT_USER,
          variables: {
            data: {
              password: credentials?.password,
              dbPassword: existingUser?.password,
            },
          },
        });
        if (!connectUser.data) throw new Error('Could not log you in');

        return { email: existingUser.data.findExistingUser.email };
      },
    }),
  ],
});
