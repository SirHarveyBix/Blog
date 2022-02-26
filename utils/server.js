import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import typeDefs from './schema/typeDefs.js';
import resolvers from './schema/resolvers.js';
import http from 'http';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();
server.applyMiddleware({ app });

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
