import { client } from '/pages/api/graphql';
import { CREATE_USER } from '/src/graphql/query';

import { EXISTING_USER } from '../../../src/graphql/query';

export default async function handler(request, response) {
  console.log('ok');
  console.log(request, response);
}
