import { ChatContent } from "@/types";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import * as jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET as string;

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const token = request.headers.get('Authorization');
  const { chat } = await request.json() as { chat: ChatContent[] };

  if (!token) {
    return new Response('Token must be a valid token', { status: 401 });
  }

  if (!chat) {
    return new Response('Missing required values!', { status: 400 });
  }

  try {
    const { id } = jwt.verify(token.split(' ')[1], secretKey) as { id: string };

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return new Response('User not found', { status: 401 });
    }

    const createdChat = chat.map(({ options, ...rest }) => {
      if (!options) {
        return prisma.chat.create({
          data: {
            user_id: id,
            ...rest,
          }
        })
      }
      return prisma.chat.create({
        data: {
          user_id: id,
          ...rest,
          options: { create: options }
        }
      })
    });
    await Promise.all(createdChat);

    return new Response("Created");
  } catch (error) {
    return new Response('Token must be a valid token', { status: 401 });
  }
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

    const chat = await prisma.chat.findMany({
      orderBy: { date: 'asc' },
      include: { options: true }
    });

    return new Response(JSON.stringify(chat));
  } catch (error) {
    return new Response('Token must be a valid token', { status: 401 });
  }
}
