import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const chat = await prisma.chat.create({
      data: {
        title: req.body.title,
      },
    });

    await prisma.userChat.create({
      data: {
        user: {
          connect: {
            id: session.user.email,
          },
        },
        chat: {
          connect: {
            id: chat.id,
          },
        },
        
      },
    });

    // Add any additional logic for connecting other users if needed

    res.status(201).json(chat);
  } catch (error) {
    console.error('Error creating chat:', error);
    res.status(500).json({ message: 'Error creating chat' });
  }
};

export default handler;