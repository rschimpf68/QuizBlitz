
import { getUser, createUser } from '../../../lib/prisma/users'
import type { NextApiRequest, NextApiResponse } from 'next'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'GET') {
      try {
         const users = await getUser();
         return res.status(200).json({ users })
      } catch (error) {
         return res.status(500).json(error)
      }
   }

   if (req.method === 'POST') {
      try {
         const data = req.body;
         const userFromDb = await createUser(data);
         return res.status(200).json({ userFromDb })
      } catch (error) {
         return res.status(500).json(error)
      }
   }
   res.setHeader('Allow', ['GET', 'POST']);
   res.status(425).end(`Method ${req.method} is not allowed`);

}