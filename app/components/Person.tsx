import React, { SetStateAction } from "react";

interface PersonProps{
  name: string,
}

const Person: React.FC<PersonProps> = ({name}) => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-700 transition cursor-pointer">
      <div className="flex-1 min-w-0">
        {/* Name */}
        <h3 className="text-sm font-semibold text-gray-100 truncate">
          {name}
        </h3>
      </div>
    </div>
  );
};

export default Person;
