'use client'

import { ChatContent } from "@/types";
import { ReactNode, SetStateAction, createContext, useContext, useState } from "react";

interface UserContextProps {
  loggedUser: string,
  handleLoggedUser: (user: string) => void,
  chat: ChatContent[],
  setChat: (chatData: SetStateAction<ChatContent[]>) => void
}

const userContext = createContext({} as UserContextProps);

interface UserProviderProps {
  user: string;
  children: ReactNode;
}

export function UserProvider({ user, children }: UserProviderProps) {
  const [loggedUser, setLoggedUser] = useState(user);
  const [chat, setChat] = useState<ChatContent[]>([]);

  const handleLoggedUser = (user: string) => { setLoggedUser(user) };

  return (
    <userContext.Provider
      value={{
        loggedUser,
        handleLoggedUser,
        chat,
        setChat
      }}
    >
      {children}
    </userContext.Provider>
  );
}

export const useUserContext = () => useContext(userContext);
