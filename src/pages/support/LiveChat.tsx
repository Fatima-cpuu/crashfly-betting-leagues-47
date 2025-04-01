
import React, { useEffect } from "react";

const LiveChat = () => {
  useEffect(() => {
    window.location.href = "https://t.me/AviatorCustomerCare";
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Redirecting to Live Chat</h1>
        <p>You are being redirected to our Telegram support channel: @AviatorCustomerCare</p>
        <p className="mt-4">If you are not redirected automatically, <a href="https://t.me/AviatorCustomerCare" className="text-blue-400 underline">click here</a></p>
      </div>
    </div>
  );
};

export default LiveChat;
