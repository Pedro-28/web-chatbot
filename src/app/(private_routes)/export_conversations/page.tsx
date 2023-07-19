'use client'

import { Button } from "@/components/ui/button";
import { ChatContent } from "@/types";
import dayjs from "dayjs";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";

interface ChatData {
  name: string;
  date: string;
  content: string;
}

export default function ExportConversations() {
  const [chatData, setChatData] = useState<ChatData[]>([]);

  useEffect(() => {
    async function fetchChatData() {
      const token = parseCookies()['chatbot_session'];

      const response = await fetch('/api/chat', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })

      const data = await response.json() as ChatContent[];
      const chat = data.map(({ name, date, content }) => ({
        name,
        date: dayjs(date).format('DD/MM/YYYY HH:mm'),
        content
      }));

      setChatData(chat);
    }
    fetchChatData();
  }, []);

  return <div className="flex py-6 justify-center bg-slate-50 ">
    <table className="min-w-max table-auto shadow-md rounded" >
      <thead>
        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th className="py-3 px-6 text-left">User</th>
          <th className="py-3 px-6 text-left">Date</th>
          <th className="py-3 px-6 text-left">Content</th>
          <th className="py-3 px-6 text-left">
            <Button>
              <CSVLink
                filename="chat_bot_conversations.csv"
                data={chatData}>
                Export
              </CSVLink>
            </Button>
          </th>
        </tr>
      </thead>
      <tbody className="w-full text-gray-600 text-sm font-light">
        {chatData.map((rowData, index) => (
          <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
            <td className="py-3 px-6 text-left whitespace-nowrap">{rowData.name}</td>
            <td className="py-3 px-6 text-left whitespace-nowrap">{rowData.date}</td>
            <td className="py-3 px-6 text-left whitespace-pre-line max-w-[12rem]">{rowData.content}</td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table >
  </div >
}
