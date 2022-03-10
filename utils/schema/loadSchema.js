import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchema } from '@graphql-tools/load';
import { makeExecutableSchema } from '@graphql-tools/schema';
import pkg from 'lodash';
const { merge } = pkg;

import budgetResolver from './resolvers/budget.js';
import contactResolver from './resolvers/contact.js';
import postsResolver from './resolvers/posts.js';
import userResolver from './resolvers/user.js';

const schema = await loadSchema('./**/*.graphql', {
  loaders: [new GraphQLFileLoader()],
});

const executableSchema = makeExecutableSchema({
  resolvers: merge(postsResolver, contactResolver, userResolver, budgetResolver),
  typeDefs: schema,
});

export default executableSchema;
