import React from "react";

interface DebugBarProps {}

const DebugBar: React.FC<DebugBarProps> = () => {
  return (
    <div className="flex  bg-[#3e4146] text-white fixed bottom-0 w-full p-3">
      Console
    </div>
  );
};

export default DebugBar;
