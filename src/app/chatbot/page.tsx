'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getChatBotOptionsResponse, getChatBotResponse } from "@/helpers/getChatBotResponse";
import { FormEvent, useState } from "react";

interface OptionContent {
  option: string;
  optionResponse: string;
  referenceLink: string;
}

interface ChatContent {
  id: string;
  name: string;
  imageUrl: string;
  shortName: string;
  content: string | string[];
  options: OptionContent[] | null;
  isOptionsDisabled: boolean;
  referenceLink?: string;
}

let ID = 0;

export default function ChatBot() {
  const [inputText, setInputText] = useState('');
  const [chat, setChat] = useState<ChatContent[]>([]);

  const handleBotContent = () => {
    const name = 'Pedro';
    ID++
    let botContent: ChatContent = {
      id: `${ID}`,
      name: 'ChatBot',
      imageUrl: '',
      shortName: 'CB',
      content: '',
      options: null,
      isOptionsDisabled: false,
    };

    if (inputText.includes('hello')) {
      botContent = {
        ...botContent,
        content: getChatBotResponse(1, name),
      };
    } else if (inputText.includes('loan')) {
      botContent = {
        ...botContent,
        content: getChatBotResponse(2),
        options: getChatBotOptionsResponse(),
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
    const name = 'Pedro';
    const newChatValues: ChatContent[] = [];
    ID++
    const userContent = {
      id: `${ID}`,
      name: name,
      imageUrl: 'https://github.com/Pedro-28.png',
      shortName: 'PH',
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

  const handleBotOptions = (content: string, referenceLink: string, id: string) => {
    const name = 'Pedro';

    ID++
    const botContent = {
      id: `${ID}`,
      name: 'ChatBot',
      imageUrl: '',
      shortName: 'CB',
      content,
      options: null,
      isOptionsDisabled: false,
      referenceLink,
    };


    setChat((prevState) => [
      ...prevState.map((chatContent) => {
        if (chatContent.id === id) return { ...chatContent, isOptionsDisabled: true };
        return chatContent
      }),
      botContent
    ]);
    setInputText('');
  }

  return (
    <div className="flex min-h-screen bg-slate-50 justify-center items-center">
      <Card className="w-[440px] grid grid-rows-[min-content_1fr_min-content]">
        <CardHeader>
          <CardTitle>ChatBot</CardTitle>
          <CardDescription>chatbot</CardDescription>
        </CardHeader>
        <CardContent >
          <ScrollArea className="h-[600px] w-full pr-4">
            {
              chat.map(({ id, shortName, imageUrl, content, options, referenceLink, isOptionsDisabled }, i) => (
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
                      <span className="block font-bold text-slate-700">Human:</span>
                      {content}
                      {referenceLink && <a
                        className="text-primary hover:text-primary/90 underline"
                        href={referenceLink}
                      >
                        here
                      </a>}
                      .
                    </p>
                    <div className="flex flex-col gap-1">
                      {options && options.map(({ option, optionResponse, referenceLink }) => (
                        <Button
                          key={option}
                          onClick={() => handleBotOptions(optionResponse, referenceLink, id)}
                          // className="cursor-not-allowed"
                          disabled={isOptionsDisabled}
                          type="button"
                        >{option}</Button>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            }
            {/* <div className="flex gap-3 text-slate-600 text-sm mb-4">
              <Avatar>
                <AvatarFallback>PH</AvatarFallback>
                <AvatarImage src="https://github.com/Pedro-28.png" />
              </Avatar>
              <p className="leading-relaxed">
                <span className="block font-bold text-slate-700">Human:</span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid ex excepturi consectetur deserunt
                incidunt possimus non dolorum nihil iusto quis error repellendus saepe ad est ab eos
                aliquam, veniam reiciendis.
              </p>
            </div> */}
            {/* <div className="flex gap-3 text-slate-600 text-sm">
              <Avatar>
                <AvatarFallback>CB</AvatarFallback>
                <AvatarImage src="" />
              </Avatar>
              <p className="leading-relaxed">
                <span className="block font-bold text-slate-700">Chatbot:</span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid ex excepturi consectetur deserunt
                incidunt possimus non dolorum nihil iusto quis error repellendus saepe ad est ab eos
                aliquam, veniam reiciendis.
              </p>
            </div> */}
          </ScrollArea>
        </CardContent>
        <CardFooter >
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
        </CardFooter>
      </Card>
    </div>
  )
}
