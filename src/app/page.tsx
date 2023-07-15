'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormEvent, useState } from "react";

interface ChatContent {
  name: string;
  imageUrl: string;
  shortName: string;
  content: string;
}

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [chat, setChat] = useState<ChatContent[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newChatValues = [      
    ];

    if (inputText.includes('hello')) {

    }

    setChat((prevState) => [...prevState]);
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
              chat.map(({ shortName, imageUrl, content }, i) => (
                <div
                  key={`${shortName}-${i}`}
                  className="flex gap-3 text-slate-600 text-sm mb-4"
                >
                  <Avatar>
                    <AvatarFallback>{shortName}</AvatarFallback>
                    <AvatarImage src={imageUrl} />
                  </Avatar>
                  <p className="leading-relaxed">
                    <span className="block font-bold text-slate-700">Human:</span>
                    {content}
                  </p>
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
