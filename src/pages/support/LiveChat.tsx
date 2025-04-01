
import React, { useEffect } from "react";

const LiveChat = () => {
  useEffect(() => {
    window.location.href = "mailto:ellenstones54@gmail.com";
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Redirecting to Email Support</h1>
        <p>You are being redirected to email: ellenstones54@gmail.com</p>
        <p className="mt-4">If you are not redirected automatically, <a href="mailto:ellenstones54@gmail.com" className="text-blue-400 underline">click here</a></p>
      </div>
    </div>
  );
};

export default LiveChat;
