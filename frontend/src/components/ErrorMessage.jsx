import React from "react";
import { AlertCircle } from "lucide-react";

const ErrorMessage = ({ message = "Something went wrong" }) => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
        <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
        <span className="text-red-800">{message}</span>
      </div>
    </div>
  );
};

export default ErrorMessage;
