import React from "react";
import { Image, FileText, Video } from "lucide-react";

interface SidebarProps{
  name: string,
  onlineStatus: boolean
}

const ProfileSidebar: React.FC<SidebarProps> = ({name, onlineStatus}) => {
  return (
    <div className="bg-gray-800 w-1/4 min-h-screen text-white flex flex-col items-center p-6 border-l border-gray-700">
      {/* Avatar */}
      <div className="flex flex-col items-center mt-10">
        <img
          src="https://i.pravatar.cc/150?img=5"
          alt="Profile Avatar"
          className="w-24 h-24 rounded-full object-cover border-4 border-gray-700 shadow-md"
        />
        <h2 className="mt-4 text-xl font-semibold">{name}</h2>
        <p className="text-sm text-gray-400">{onlineStatus}</p>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gray-700 my-6"></div>

      {/* Media Section */}
      <div className="w-full px-4">
        <h3 className="text-lg font-semibold mb-3">Media Shared</h3>

        <div className="grid grid-cols-3 gap-3">
          {/* Example media */}
          <img
            src="https://picsum.photos/100"
            className="w-full h-20 object-cover rounded-lg hover:opacity-80 cursor-pointer"
            alt="shared media"
          />
          <img
            src="https://picsum.photos/101"
            className="w-full h-20 object-cover rounded-lg hover:opacity-80 cursor-pointer"
            alt="shared media"
          />
          <img
            src="https://picsum.photos/102"
            className="w-full h-20 object-cover rounded-lg hover:opacity-80 cursor-pointer"
            alt="shared media"
          />
        </div>

        {/* Example file / video */}
        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-300 hover:text-white cursor-pointer">
            <FileText className="w-4 h-4" />
            <span>resume.pdf</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300 hover:text-white cursor-pointer">
            <Video className="w-4 h-4" />
            <span>holiday_clip.mp4</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
