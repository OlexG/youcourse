import type { NextApiRequest, NextApiResponse } from 'next'
import Client from '../../lib/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const item = req.body;
  const client = new Client();
  await client.connect();
  await client.addItem(item);
  await client.disconnect();
  res.status(200).json({ message: "Hello World" })
}