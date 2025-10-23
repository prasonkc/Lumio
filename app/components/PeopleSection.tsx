"use client";
import React from "react";
import { MoreVertical, Search, MessageCircle, Users } from "lucide-react";
import Person from "./Person";
import { useEffect, useState } from "react";

interface PeopleProps {
  name: string;
  setCurrentChat: React.Dispatch<React.SetStateAction<string>>;
  setCurrentChatID: React.Dispatch<React.SetStateAction<string>>;
  hamburgOpen: boolean;
}

interface Contact {
  _id: string;
  username: string | null;
}

const PeopleSection: React.FC<PeopleProps> = ({
  name,
  setCurrentChat,
  setCurrentChatID,
  hamburgOpen,
}) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const res = await fetch("/api/contacts");
      if (!res.ok) {
        console.error("Failed to fetch contacts");
        return;
      }
      const data = await res.json();
      setContacts(data);
    };
    fetchContacts();
  }, []);

  return (
    <div>
      {hamburgOpen && (
        // change here => chatsection hidden when hamburgOpen=true; this div takes full space
        <div className="flex flex-col bg-gray-900 md:w-80 w-full min-h-screen border-r border-gray-800">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
            <h2 className="text-lg font-semibold text-white">Messages</h2>
            <button className="p-1 hover:bg-gray-800 rounded-lg">
              <MoreVertical className="text-gray-400" size={20} />
            </button>
          </div>

          {/* Search Bar */}
          <div className="px-4 py-3">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-800 text-gray-200 pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* People List */}
          <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
            {contacts.map((person) => (
              <div
                key={person._id}
                onClick={() => {
                  setCurrentChat(person.username as string);
                  setCurrentChatID(person._id);
                }}
              >
                <Person name={person.username as string} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PeopleSection;
