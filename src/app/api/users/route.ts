import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import * as bcrypt from "bcryptjs";
import * as jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET as string;

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return new Response('Missing username or password!', { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { username } });

  if (!!user) {
    return new Response('Username is already taken', { status: 401 });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const { id } = await prisma.user.create({ data: { username, password: encryptedPassword } });

  const token = jwt.sign({ id }, secretKey, { expiresIn: '10h' });

  return new Response(JSON.stringify({ username, token }));
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get('chatbot_session')?.value;
  if (!token) {
    return new Response('Token must be a valid token', { status: 401 });
  }

  try {
    const { id } = jwt.verify(token, secretKey) as { id: string };

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return new Response('User not found', { status: 401 });
    }

    return new Response(JSON.stringify({ username: user.username }));
  } catch (error) {
    return new Response('Token must be a valid token', { status: 401 });
  }
}
