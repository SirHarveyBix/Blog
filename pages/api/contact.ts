import { FetchResult } from '@apollo/client';
import { NextApiRequest, NextApiResponse } from 'next';
import client from 'pages/api/graphql';
import { SEND_MESSAGE } from 'src/graphql/query';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'POST') {
    const { email, name, message } = request.body;
    if (
      !email ||
      !name ||
      !message ||
      !email.includes('@') ||
      name.trim() === '' ||
      message.trim() === ''
    ) {
      response.status(422).json({ message: 'Invalid input' });
      return;
    }
    //TODO remove any
    let newMessage: any = { email, name, message };
    try {
      newMessage = await client.mutate<FetchResult>({
        mutation: SEND_MESSAGE,
        variables: { data: newMessage },
      });
    } catch (error) {
      response.status(500).json({ message: 'could not connect to mongo DB !' });
      return;
    }

    response
      .status(201)
      .json({ message: 'Successfully Sent !', messageId: newMessage?.data?.sendMessage.id });
  }
}
