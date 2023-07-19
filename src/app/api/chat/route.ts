import { ChatContent } from "@/types";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import * as jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET as string;

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { userId, chat } = await request.json() as { userId: string, chat: ChatContent[] };

  if (!userId || !chat) {
    return new Response('Missing required values!', { status: 400 });
  }

  const createdChat = chat.map(({ options, ...rest }) => {
    if (!options) {
      return prisma.chat.create({
        data: {
          user_id: userId,
          ...rest,
        }
      })
    }
    return prisma.chat.create({
      data: {
        user_id: userId,
        ...rest,
        options: { create: options }
      }
    })

  });

  await Promise.all(createdChat);

  return new Response("Created");
}

export async function GET(request: NextRequest) {
  const token = request.headers.get('Authorization');

  if (!token) {
    return new Response('Token must be a valid token', { status: 401 });
  }

  try {
    const { id } = jwt.verify(token.split(' ')[1], secretKey) as { id: string };

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return new Response('User not found', { status: 401 });
    }

    const chat = await prisma.chat.findMany({ include: { options: true } })

    return new Response(JSON.stringify({ username: user.username }));
  } catch (error) {
    return new Response('Token must be a valid token', { status: 401 });
  }
}
