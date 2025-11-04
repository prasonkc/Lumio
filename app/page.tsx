"use client";

import Image from "next/image";
import PeopleSection from "./components/PeopleSection";
import ChatSection from "./components/chat/ChatSection";
import ProfileSidebar from "./components/ProfileSidebar";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// Test ssh
export default function Home() {
  const [currentChat, setCurrentChat] = useState("");
  const [currentChatID, setCurrentChatID] = useState("");
  const { data: session, status } = useSession();

  const router = useRouter();

  // hamburg state (for phones)
  const [hamburgOpen, setHamburgOpen] = useState(true);

  // Request notification permission
  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (!session) return null;
  const name = session.user?.name ?? "";
  const roomid = [session.user?.id, currentChatID]
    .filter(Boolean)
    .sort()
    .join("_");

  return (
    <div>
      <div className="md:flex hidden">
        <PeopleSection
          name={name}
          setCurrentChat={setCurrentChat}
          setCurrentChatID={setCurrentChatID}
          hamburgOpen={hamburgOpen}
        />
        <ChatSection
          roomId={roomid}
          name={name}
          currentChat={currentChat}
          hamburgOpen={hamburgOpen}
          setHamburgOpen={setHamburgOpen}
        />
        <ProfileSidebar name={currentChat} />
      </div>

      <div className="md:hidden text-xs text-white flex w-[100vw] h-[700px] justify-center items-center">
        <div>Switch to desktop to use this application</div>
      </div>
    </div>
  );
}
