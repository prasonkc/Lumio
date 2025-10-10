"use client";

import Image from "next/image";
import PeopleSection from "./components/PeopleSection";
import ChatSection from "./components/ChatSection";
import ProfileSidebar from "./components/ProfileSidebar";
import { useState } from "react";

export default function Home() {
  const [name, setname] = useState("");
  const [avatarUrl, setavatarUrl] = useState("")
  const [onlineStatus, setonlineStatus] = useState(false);
  const [latestMessage, setLatestMessage] = useState("");
  // Fetch from database
  return (
    <div className="flex">
    <PeopleSection name={name} avatarUrl={avatarUrl} isOnline={onlineStatus} latestChat={latestMessage} />
      <ChatSection roomId="room123"/>
      <ProfileSidebar name={name} onlineStatus={onlineStatus}/>
    </div>
  );
}
