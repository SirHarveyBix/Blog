import client from '/pages/api/graphql';
import { CREATE_USER, EXISTING_USER } from '/src/graphql/query';

export default async function handler(request, response) {
  if (request.method !== 'POST') return;

  const data = request.body;
  const { email, password } = data;

  let userExists;
  try {
    userExists = await client.query({
      query: EXISTING_USER,
      variables: { data: { email: email } },
    });
  } catch (error) {
    console.error(error);
  }

  if (userExists?.data.findExistingUser) {
    response.status(422).json({ message: 'User already exists' });
    return;
  }

  try {
    await client.mutate({
      mutation: CREATE_USER,
      variables: { data: data },
      refetchQueries: [{ query: EXISTING_USER, variables: { data: { email: email } } }],
    });
  } catch (error) {
    console.error(error);
  }

  response.status(201).json({ message: 'User Created' });
}
