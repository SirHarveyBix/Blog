import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
// import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from '../../utils/schema/typeDefs';
import resolvers from '../../utils/schema/resolvers';
import { applyMiddleware } from 'graphql-middleware';

// const cors = Cors();
export const config = { api: { bodyParser: false } };

const schema = applyMiddleware(makeExecutableSchema({ typeDefs, resolvers }));

export const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  schema,
  uri: 'http://localhost:4000/api/graphql',
  cache: new InMemoryCache(),
});

// const server = new ApolloServer({
//   ssrMode: typeof window === 'undefined',
//   schema,
//   // context: async ({ req, res }) => {
//   //   console.log(req, res);
//   // },
// });

//   server.listen().then(({ url }) => {
//     console.log(`🚀  Server ready at ${url}`);
//   });
