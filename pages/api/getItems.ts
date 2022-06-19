import type { NextApiRequest, NextApiResponse } from 'next'
import Client from '../../lib/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new Client();
  await client.connect();
  const items = await client.getItems();
  await client.disconnect();
  res.status(200).json(items)
}