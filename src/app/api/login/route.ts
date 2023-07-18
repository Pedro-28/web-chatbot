import { PrismaClient } from "@prisma/client";
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

  if (!user) {
    return new Response('User not found', { status: 401 });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) return new Response('Incorrect username or password', { status: 401 });

  const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '10h' });

  return new Response(JSON.stringify({ username, token }));
}