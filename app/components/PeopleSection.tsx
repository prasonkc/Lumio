import React from "react";
import { MoreVertical, Search, MessageCircle, Users } from "lucide-react";
import Person from "./Person";

const PeopleSection = () => {

  return (
    <div className="bg-gray-800 w-1/4 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mx-5">
        <div className="m-3 font-bold text-2xl">Messages</div>
        <div className="cursor-pointer hover:text-white">
          <MoreVertical />
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative m-3">
        {/* Icon */}
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          size={18}
        />
        {/* Input */}
        <input
          type="text"
          placeholder="Search conversations..."
          className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mt-4">
        {/* Chats tab */}
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer`}
        >
          <MessageCircle size={18} />
          <span className="text-sm font-medium">Chats</span>
        </button>

        {/* Contacts tab */}
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer`}
        >
          <Users size={18} />
          <span className="text-sm font-medium">Contacts</span>
        </button>
      </div>

      {/* Peoples Section */}
      <div className="my-5">
        <Person />
        <Person />
        <Person />
      </div>
    </div>
  );
};

export default PeopleSection;
