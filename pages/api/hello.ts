// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import mockData from '../../mock_data.json';
import HelloInterface from './HelloInterface';

export const DEFAULT_LIMIT = 10;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: HelloInterface[] }>
) {
  const { limit = DEFAULT_LIMIT, offset = 0 } = req.query;
  const calculatedLimit = +offset + +limit;
  const result = mockData.data.slice(+offset, calculatedLimit);

  res.status(200).json({ data: result });
}
