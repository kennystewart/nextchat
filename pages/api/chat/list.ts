import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  const userId = session.user;
  if (req.method === 'GET') {
    try {
        const chats = await prisma.chat.findMany({
            where: {
              UserChats: {
                some: {
                  userId: session.user.email,
                },
              },
            },
            include: {
              UserChats: true,
              messages: {
                include: {
                  MessageLikes: true,
                },
              },
            },
          });
      res.status(200).json(chats);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch chat rooms' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
