import client from '/pages/api/graphql';
import { CREATE_USER } from '/src/graphql/query';
import { EXISTING_USER } from '/src/graphql/query';

export default async function handler(request, response) {
  if (request.method !== 'POST') return;

  const data = request.body;
  const { email, password } = data;

  const existingUser = await client.query({
    query: EXISTING_USER,
    variables: { data: { email: email } },
  });

  if (existingUser.data.findExistingUser?._id) {
    response.status(422).json({ message: 'User already exists' });
    return;
  }
  const result = await client.mutate({
    mutation: CREATE_USER,
    variables: { data: data },
  });

  response.status(201).json({ message: 'User Created' });
}
