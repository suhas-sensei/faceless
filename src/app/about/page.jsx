"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import Image from "next/image";

function formatDate(date) {
  const options = {
    day: "2-digit",
    month: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
}
export default function Chat() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
      setCurrentTime(formattedTime);
    };
    const timer = setInterval(updateTime, 100);
    updateTime();
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-auto  scrollbar-hide">
      {/* Navbar */}
      <div className="navbar">
        <div className="w-full bg-white text-black flex items-center justify-between px-4 py-2 fixed left-0 top-0 z-50">
          {/* Left Side: Time */}
          <div className="text-l font-semibold">{currentTime}</div>

          {/* Center: Dynamic Island */}
          <div className="flex-1 flex justify-center">
            <Image
              src="/dyisland.png"
              className="h-6 w-20 ml-8"
              alt="Dynamic Island"
              width={80} // Adjust the width as per the actual image size
              height={24} // Adjust the height as per the actual image size
            />
          </div>

          {/* Right Side: Icons */}
          <div className="flex items-center space-x-3">
            {/* Signal Icon */}
            <Image
              src="/network.png"
              className="h-5 w-5"
              alt="Signal Icon"
              width={20}
              height={20}
            />

            {/* Wi-Fi Icon */}
            <Image
              src="/wifi.png"
              className="h-6 w-6"
              alt="Wi-Fi Icon"
              width={24}
              height={24}
            />

            {/* Battery Icon */}
            <Image
              src="/battery.png"
              className="h-7 w-6"
              alt="Battery Icon"
              width={24}
              height={28}
            />
          </div>
        </div>

        {/* Profile Section under Navbar */}
        <div className="w-full flex items-center px-4 py-3 z-50 bg-white fixed top-[44px] mt-0">
          <button className="text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <Image
            src="/pfp.png"
            className="rounded-full h-10 w-10 mx-3"
            alt="Profile"
            width={40} // Adjust the width according to the image size (10 x 4 = 40px)
            height={40} // Adjust the height according to the image size (10 x 4 = 40px)
          />

          <div className="flex flex-col">
            <span className="font-bold">faceless.trbe</span>
            <span className="text-xs text-gray-500">share your story</span>
          </div>

          <div className="flex ml-auto space-x-4">
            <button className="text-black">
              <Image
                src="/call.png"
                className="h-6 w-6"
                alt="Call Icon"
                width={24} // 6 * 4 = 24px
                height={24} // 6 * 4 = 24px
              />
            </button>

            <button className="text-black">
              <Image
                src="/vidcall.png"
                className="h-7 w-7"
                alt="Video Call Icon"
                width={28} // 7 * 4 = 28px
                height={28} // 7 * 4 = 28px
              />
            </button>
          </div>
        </div>

        {/* Profile bIG */}
        <div className="flex flex-col justify-end flex-grow overflow-hidden pt-2 pb-20 px-4 scrollbar-hide">
          <div className="max-w-xs mx-auto bg-#FFFFFF rounded-lg overflow-hidden mt-28">
            <div className="flex justify-center mt-2">
              <div className="rounded-full border-4 border-white">
                <Image
                  src="/pfp.png"
                  alt="Profile"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="text-center mt-1">
              <h2 className="text-lg font-bold text-gray-800">faceless</h2>
              <p className="text-gray-600 text-sm">
                Mental health service · Instagram
              </p>
              <div>
                {isVisible && (
                  <div id="demlete">
                    <p className=" text-gray-600 text-sm">
                      22 followers · 33 posts
                    </p>
                    <p className=" text-gray-600 text-sm">
                      You don&apos;t follow each other on Instagram
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Image
          src="/about.png" // Path to the uploaded image
          alt="Faceless About Image"
          width={400} // Adjust the width based on your preference
          height={400} // Adjust the height based on your preference
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
