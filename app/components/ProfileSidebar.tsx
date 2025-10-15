import React from "react";

interface SidebarProps {
  name: string;
}

const ProfileSidebar: React.FC<SidebarProps> = ({ name }) => {
  return (
    <div className="bg-gray-900 w-1/4 min-h-screen text-white flex flex-col items-center p-8 border-l border-gray-800">
      {/* Avatar */}
      <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
        {name ? name[0].toUpperCase() : "?"}
      </div>

      {/* Username */}
      <h2 className="text-xl font-semibold">{name || "No Chat Selected"}</h2>

      {/* Status or tagline */}
      {/* <p className="text-gray-400 text-sm mt-1">Online</p> */}

      {/* Divider */}
      <div className="w-full h-px bg-gray-700 my-6" />

      {/* Placeholder for future options */}
      <div className="w-full text-gray-400 text-sm text-center">
        <p>More coming soon ⚙️</p>
      </div>
    </div>
  );
};

export default ProfileSidebar;
