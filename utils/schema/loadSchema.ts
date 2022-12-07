import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';
import { merge } from 'lodash';

import budgetResolver from './resolvers/budget';
import contactResolver from './resolvers/contact';
import postsResolver from './resolvers/posts';
import userResolver from './resolvers/user';

const schema: GraphQLSchema = loadSchemaSync('./**/*.graphql', {
  loaders: [new GraphQLFileLoader()],
});

const executableSchema = makeExecutableSchema({
  resolvers: merge(postsResolver, contactResolver, userResolver, budgetResolver),
  typeDefs: schema,
});

export default executableSchema;
