import Image from "next/image";
import PeopleSection from "./components/PeopleSection";
import ChatSection from "./components/ChatSection"
import ProfileSection from "./components/ProfileSection"

export default function Home() {
  return (
    <div className="flex">
        <PeopleSection></PeopleSection>
        <ChatSection></ChatSection>
        <ProfileSection></ProfileSection>
    </div>  
  );
}
