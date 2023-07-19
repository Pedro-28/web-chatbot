import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Props {
  children: ReactNode;
}

export default async function Layout({ children }: Props) {
  if (!cookies().has('chatbot_session')) {
    redirect('/');
  }

  return (
    <>{children}</>
  )
}
