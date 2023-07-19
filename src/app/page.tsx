'use client'

import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { useUserContext } from "@/context/users";

export default function Home() {
  const { handleLoggedUser } = useUserContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })

    if (response.status === 200) {
      const { token, username: user } = await response.json();

      handleLoggedUser(user);

      setCookie(undefined, 'chatbot_session', token, {
        path: '/',
        maxAge: 60 * 60 * 10, // 10 hours
      });

      router.push('/chatbot');
      return;
    }

    setUsername('');
    setPassword('');
    alert('Incorrect username or password');
  }

  return (
    <div className="flex min-h-screen bg-slate-50 justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>
            Login
          </CardTitle>
        </CardHeader>
        <form
          onSubmit={handleSubmit}
        >

          <CardContent className="flex flex-col w-full gap-3 pb-3">
            <Input
              value={username}
              placeholder="Type your username"
              onChange={({ target }) => setUsername(target.value)}
            />
            <Input
              type="password"
              value={password}
              placeholder="Type your password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-3 items-start">
            <Button
              className="w-full"
              type="submit"
            >
              Login
            </Button>
            <div className="flex text-slate-600 text-sm gap-1">
              <p>Don&apos;t have an account?</p>
              <Link
                className="font-bold text-slate-700 hover:text-slate-700/90"
                href='/register'
              >
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
