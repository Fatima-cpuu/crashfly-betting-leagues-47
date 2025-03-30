
import React from "react";
import { Mail, Clock, PhoneCall } from "lucide-react";

const EmailSupport = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Email Support</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Mail className="text-aviator-red mr-3" size={24} />
              <h2 className="text-xl font-semibold">Email Us</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Send us an email and we'll get back to you within 24 hours.
            </p>
            <div className="bg-gray-700 p-3 rounded flex items-center justify-between">
              <span>support@aviator-game.com</span>
              <button 
                className="text-sm text-aviator-red hover:underline"
                onClick={() => {
                  navigator.clipboard.writeText('support@aviator-game.com');
                  alert('Email copied to clipboard!');
                }}
              >
                Copy
              </button>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Clock className="text-aviator-red mr-3" size={24} />
              <h2 className="text-xl font-semibold">Response Time</h2>
            </div>
            <p className="text-gray-300">
              Our team is available to answer your emails during the following hours:
            </p>
            <ul className="mt-4 space-y-2 text-gray-300">
              <li className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>9:00 AM - 9:00 PM UTC</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday - Sunday:</span>
                <span>10:00 AM - 6:00 PM UTC</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg md:col-span-2">
            <div className="flex items-center mb-4">
              <PhoneCall className="text-aviator-red mr-3" size={24} />
              <h2 className="text-xl font-semibold">Phone Support</h2>
            </div>
            <p className="text-gray-300 mb-4">
              For urgent matters, you can also reach our support team by phone:
            </p>
            <div className="bg-gray-700 p-3 rounded flex items-center justify-between">
              <span>+1 (555) 123-4567</span>
              <button 
                className="text-sm text-aviator-red hover:underline"
                onClick={() => {
                  navigator.clipboard.writeText('+1 (555) 123-4567');
                  alert('Phone number copied to clipboard!');
                }}
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSupport;
