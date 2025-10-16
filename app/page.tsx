"use client";

import Image from "next/image";
import PeopleSection from "./components/PeopleSection";
import ChatSection from "./components/ChatSection";
import ProfileSidebar from "./components/ProfileSidebar";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  // const [name, setname] = useState("");
  const [currentChat, setCurrentChat] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (!session) return null;
  const name = session.user?.name ?? "";

  return (
    <div className="flex">
      <PeopleSection
        name={name}
        setCurrentChat={setCurrentChat}
      />
      <ChatSection roomId="room123" name={name}/>
      <ProfileSidebar name={currentChat}/>
    </div>
  );
}
