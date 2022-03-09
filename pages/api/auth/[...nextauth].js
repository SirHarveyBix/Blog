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
        let userExists;
        try {
          userExists = await client.query({
            query: EXISTING_USER,
            variables: { data: { email: credentials.email } },
          });
        } catch (error) {
          console.error(error);
        }
        if (!userExists.data.findExistingUser) {
          throw new Error("l'utilisateur n'existe pas !");
        }

        let connectUser;
        try {
          connectUser = await client.query({
            query: CONNECT_USER,
            variables: {
              data: {
                password: credentials.password,
                dbPassword: userExists.data.findExistingUser.password,
              },
            },
          });
        } catch (error) {
          console.error(error);
        }
        if (!connectUser.data?.connectUser?.isValid) {
          throw new Error('mauvais mot de passe');
        }

        return { email: userExists.data.findExistingUser.email };
      },
    }),
  ],
});
