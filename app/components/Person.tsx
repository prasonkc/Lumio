import React from "react";

const Person = () => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-100 transition cursor-pointer">
      {/* Avatar */}
      <div className="relative">
        <img
          src="/avatar.jpg"
          alt="User Avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        {/* Online Status */}
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
      </div>

      {/* Name + Latest Chat */}
      <div className="flex-1 min-w-0">
        {/* Name */}
        <h3 className="text-sm font-semibold text-gray-900 truncate">
          John Doe
        </h3>
        {/* Latest Chat */}
        <p className="text-sm text-gray-500 truncate">
          Hey, are we still meeting tonight?
        </p>
      </div>
    </div>
  );
};

export default Person;
