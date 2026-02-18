import React from "react";
import { Loader2 } from "lucide-react";

const Loading = ({ text = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="w-6 h-6 animate-spin text-blue-600 mr-2" />
      <span className="text-gray-600">{text}</span>
    </div>
  );
};

export default Loading;
