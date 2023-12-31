'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUserContext } from "@/context/users";
import { getDate } from "@/helpers/getDate";
import { getChatBotOptionsResponse, getChatBotResponse } from "@/helpers/getChatBotResponse";
import { ChatContent } from "@/types";
import { FormEvent, useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";

export default function ChatBot() {
  const { loggedUser, chat, setChat, isChatFinished, setIsChatFinished } = useUserContext();
  const [inputText, setInputText] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (isChatFinished) {
      fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${parseCookies()['chatbot_session']}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ chat })
      })
    }
  }, [isChatFinished]);

  const handleBotContent = () => {
    const lowercaseText = inputText.toLowerCase();

    let botContent: ChatContent = {
      name: 'ChatBot',
      date: getDate(),
      imageUrl: '',
      shortName: 'CB',
      content: '',
      options: null,
      isOptionsDisabled: false,
    };

    if (lowercaseText.includes('hello')) {
      botContent = {
        ...botContent,
        content: getChatBotResponse(1, loggedUser),
      };
    } else if (lowercaseText.includes('loan')) {
      botContent = {
        ...botContent,
        content: getChatBotResponse(2),
        options: getChatBotOptionsResponse(),
      };
    } else if (lowercaseText.includes('goodbye')) {
      botContent = {
        ...botContent,
        content: getChatBotResponse(3),
      };
      setIsChatFinished(true);
    } else if (lowercaseText.includes('i want')) {
      botContent = {
        ...botContent,
        content: getChatBotResponse(4),
      };
    } else if (lowercaseText.includes('good')) {
      botContent = {
        ...botContent,
        content: getChatBotResponse(5),
      };
    } else {
      botContent = {
        ...botContent,
        content: getChatBotResponse(999),
      };
    }

    return botContent;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newChatValues: ChatContent[] = [];

    const userContent = {
      name: loggedUser,
      date: getDate(),
      imageUrl: '',
      shortName: loggedUser[0],
      content: inputText,
      options: null,
      isOptionsDisabled: false,
    };

    const botContent = handleBotContent();


    newChatValues.push(userContent);
    newChatValues.push(botContent);

    setChat((prevState) => [...prevState, ...newChatValues]);
    setInputText('');
  }

  const handleBotOptions = (content: string, referenceLink: string, index: number) => {
    const botContent = {
      name: 'ChatBot',
      date: getDate(),
      imageUrl: '',
      shortName: 'CB',
      content,
      options: null,
      isOptionsDisabled: false,
      referenceLink,
    };


    setChat((prevState) => [
      ...prevState.map((chatContent, i) => {
        if (i === index) return { ...chatContent, isOptionsDisabled: true };
        return chatContent
      }),
      botContent
    ]);
    setInputText('');
  }

  const handleChatStart = () => {
    setChat([]);
    setIsChatFinished(false);
  }

  return (
    <div className="flex min-h-screen bg-slate-50 justify-center items-center">
      <Card className="w-[440px] grid grid-rows-[min-content_1fr_min-content]">
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle>ChatBot</CardTitle>
            <CardDescription>chatbot</CardDescription>
          </div>
          <Button
            disabled={!isChatFinished}
            onClick={() => router.push('/export_conversations')}
          >
            Export chat
          </Button>
        </CardHeader>
        <CardContent >
          <ScrollArea className="h-[600px] w-full pr-4">
            {
              chat.map(({ name, shortName, imageUrl, content, options, referenceLink, isOptionsDisabled }, i) => (
                <div
                  key={`${shortName}-${i}`}
                  className="flex gap-3 text-slate-600 text-sm mb-4"
                >
                  <Avatar>
                    <AvatarFallback>{shortName}</AvatarFallback>
                    <AvatarImage src={imageUrl} />
                  </Avatar>
                  <div>
                    <p className="leading-relaxed">
                      <span
                        className="block font-bold text-slate-700"
                      >
                        {name === 'ChatBot' ? 'ChatBot' : name}
                      </span>
                      {content}
                      {referenceLink && <a
                        className="text-primary hover:text-primary/90 underline"
                        href={referenceLink}
                      >
                        here.
                      </a>}
                    </p>
                    <div className="flex flex-col gap-1">
                      {options && options.map(({ option, optionResponse, referenceLink }) => (
                        <Button
                          key={option}
                          onClick={() => handleBotOptions(optionResponse, referenceLink, i)}
                          disabled={isOptionsDisabled}
                          type="button"
                        >{option}</Button>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            }
          </ScrollArea>
        </CardContent>
        <CardFooter >
          {
            isChatFinished ? (
              <Button
                className="w-full"
                onClick={handleChatStart}
                type="button"
              >
                new chat
              </Button>
            ) : (
              <form
                className="w-full flex gap-2"
                onSubmit={handleSubmit}
              >
                <Input
                  onChange={({ target }) => setInputText(target.value)}
                  value={inputText}
                  placeholder="How can I help you?"
                />
                <Button type="submit">Send</Button>
              </form>
            )
          }
        </CardFooter>
      </Card>
    </div>
  )
}
