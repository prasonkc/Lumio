"use client";

import Image from "next/image";
import PeopleSection from "./components/PeopleSection";
import ChatSection from "./components/ChatSection";
import ProfileSidebar from "./components/ProfileSidebar";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [name, setname] = useState("");
  // const [avatarUrl, setavatarUrl] = useState("")
  // const [onlineStatus, setonlineStatus] = useState(false);
  // const [latestMessage, setLatestMessage] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    setname(session?.user.name as string);
  }, [status, router]);

  // Fetch from database
  return (
    <div className="flex">
      <PeopleSection
        name={name}
      />
      <ChatSection roomId="room123" name={name}/>
      <ProfileSidebar name={"Placeholder"}/>
    </div>
  );
}
