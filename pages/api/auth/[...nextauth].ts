import { ApolloError, ApolloQueryResult, NetworkStatus } from '@apollo/client';
import { GraphQLError } from 'graphql';
import NextAuth from 'next-auth';
import CredentialsProvider, { CredentialInput } from 'next-auth/providers/credentials';
import { CONNECT_USER, EXISTING_USER } from 'src/graphql/query';

import client from '../graphql';

interface UserExists {
  connectUser?: { isValid: boolean };
  data: {
    findExistingUser: {
      _id: string;
      password: string;
      email: string;
    };
  };
  errors?: readonly GraphQLError[] | undefined;
  error?: ApolloError | undefined;
  loading?: boolean;
  networkStatus?: NetworkStatus;
  partial?: boolean | undefined;
}

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  secret: process.env.SECRET,
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },

  providers: [
    CredentialsProvider({
      authorize: async (
        credentials: Record<string | symbol, string> | undefined
      ): Promise<{ id: string; email: string }> => {
        let userExists: UserExists;
        try {
          userExists = await client.query({
            query: EXISTING_USER,
            variables: { data: { email: credentials?.email } },
          });
        } catch (error) {
          console.error(error);
        }
        if (!userExists!.data.findExistingUser) {
          throw new Error("l'utilisateur n'existe pas !");
        }

        let connectUser: ApolloQueryResult<UserExists>;
        try {
          connectUser = await client.query({
            query: CONNECT_USER,
            variables: {
              data: {
                password: credentials?.password,
                dbPassword: userExists!.data.findExistingUser.password,
              },
            },
          });
        } catch (error) {
          console.error(error);
        }
        if (!connectUser!.data.connectUser?.isValid) {
          throw new Error('mauvais mot de passe');
        }

        return {
          id: userExists!.data.findExistingUser._id,
          email: userExists!.data.findExistingUser.email,
        };
      },
      credentials: null as unknown as Record<string, CredentialInput>,
    }),
  ],
});
