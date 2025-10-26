import React from "react";

interface PersonProps {
  name: string;
}

const Person: React.FC<PersonProps> = ({ name }) => {
  const trimmedName = name.trim();
  const initials =
    trimmedName.length >= 2
      ? `${trimmedName[0]}`
      : trimmedName[0] || "";

  return (
    <div className="md:flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-700 transition cursor-pointer">
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-gray-100 font-semibold text-lg flex-shrink-0">
        {initials.toUpperCase()}
      </div>

      {/* Name */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-100 truncate">{name}</h3>
      </div>
    </div>
  );
};

export default Person;
