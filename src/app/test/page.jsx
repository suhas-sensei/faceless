"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
    

// Helper function to format the date and time
function formatDate(date) {
  const options = { day: '2-digit', month: 'short', hour: 'numeric', minute: 'numeric', hour12: true };
  return date.toLocaleString('en-US', options);
}

export default function Chat() {
    const [currentTime, setCurrentTime] = useState("");
  
    useEffect(() => {
      // Function to format time in "HH:mm" (24-hour format)
      const updateTime = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`;
        setCurrentTime(formattedTime);
      };
  
      // Update time every second
      const timer = setInterval(updateTime, 100);
  
      // Initial call to set the time immediately on component mount
      updateTime();
  
      // Cleanup interval on component unmount
      return () => clearInterval(timer);
    }, []);
  const router = useRouter();
  const questions = [
    "Hello from faceless, what's your name?",
    "What's your email?",
    "What service are you interested in?",
    "What's your preferred date for the meeting?",
    "Any specific requirements?",
  ];

  const [responses, setResponses] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [input, setInput] = useState("");
  const [initialTimestamp, setInitialTimestamp] = useState(null);
  const [showNextMessage, setShowNextMessage] = useState(false);

  useEffect(() => {
    if (currentQuestionIndex === 0 && !initialTimestamp) {
      setInitialTimestamp(new Date());
      setShowNextMessage(true);
    }
  }, [currentQuestionIndex, initialTimestamp]);

  const handleSendMessage = () => {
    if (input.trim()) {
      setResponses([
        ...responses,
        { question: questions[currentQuestionIndex], answer: input },
      ]);
      setInput("");
      setShowNextMessage(false);
    }
  };

  useEffect(() => {
    if (responses.length > 0 && responses.length === questions.length) {
      (async () => {
        await fetch("/api/save-responses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(responses),
        });
        router.push("/payment");
      })();
    } else if (responses.length > 0) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setShowNextMessage(true);
      }, 800);
    }
  }, [responses]);

  return (
    <div>
      <div class="navbar">
        <div className="w-full bg-white text-black flex items-center justify-between px-4 py-2 fixed left-0 z-50">
          {/* Left Side: Time */}
          <div className="text-l font-semibold">{currentTime}</div>

          {/* Center: Dynamic Island */}
          <div className="flex-1 flex justify-center">
            <img
              src="https://media.discordapp.net/attachments/812390695864238201/1277889611342938182/image.png?ex=66cecef1&is=66cd7d71&hm=b64ddacef9191a1022028eaaed5a6fe042a75a6e8eac8998de5bfab78288743f&=&format=webp&quality=lossless"
              className="h-6 w-20 ml-8"
              alt="Dynamic Island"
            />
          </div>

          {/* Right Side: Icons */}
          <div className="flex items-center space-x-3">
            {/* Signal Icon */}
            <img
              src="https://media.discordapp.net/attachments/812390695864238201/1277903341829230612/9034760_cellular_icon.png?ex=66cedbba&is=66cd8a3a&hm=72232174f3e28e13103758d35e933a4152e44c243b5de1edd708f2217985a276&=&format=webp&quality=lossless&width=437&height=437"
              className="h-5 w-5"
              alt="Signal Icon"
            />

            {/* Wi-Fi Icon */}
            <img
              src="https://media.discordapp.net/attachments/812390695864238201/1277907881068593193/211944_wifi_icon.png?ex=66cedff5&is=66cd8e75&hm=3eae8176f80901b01bad5c56a431332223414e6db3f4407f2badd6150d9d1e91&=&format=webp&quality=lossless&width=437&height=437"
              className="h-6 w-6"
              alt="Signal Icon"
            />
            <img
              src="https://cdn.discordapp.com/attachments/812390695864238201/1277908391653544060/2639754_battery_high_icon.png?ex=66cee06e&is=66cd8eee&hm=4f49ebc7978a133892faa95e46ff84ef26b6b633b2e6ad884c2d94ef8a22d1b7&"
              className="h-7 w-6"
              alt="Signal Icon"
            />
          </div>
        </div>

        {/* Profile Section under Navbar */}
        <div className="w-full flex items-center px-4 py-3 mt-10 z-50 fixed bg-white">

        
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

          <img
            src="https://media.discordapp.net/attachments/812390695864238201/1277922679961292831/images.png?ex=66ceedbd&is=66cd9c3d&hm=a5ef524af20d0ba4887bece2aaaf11503299abf009c4fa9113738631e405f4f9&=&format=webp&quality=lossless" // Replace with your actual profile image source
            className="rounded-full h-10 w-10 mx-3"
            alt="Profile"
          />

          <div className="flex flex-col">
            <span className="font-bold">faceless.trbe</span>
            <span className="text-xs text-gray-500">share your story</span>
          </div>

          <div className="flex ml-auto space-x-4">
            <button className="text-black">
              <img
                src="https://media.discordapp.net/attachments/812390695864238201/1277924142292926544/8666632_phone_icon.png?ex=66ceef1a&is=66cd9d9a&hm=fab2c131770461fba3c7b9f1a935db423d6f90990846e2b89262ae134584b38e&=&format=webp&quality=lossless&width=437&height=437"
                className="h-6 w-6 "
                alt="Signal Icon"
              />
            </button>

            <button className="text-black">
              <img
                src="https://media.discordapp.net/attachments/812390695864238201/1277924486099898431/2639945_call_video_icon.png?ex=66ceef6c&is=66cd9dec&hm=8cd2cdcc689df3c8a417b2058887cb5c15a88740f5adddb831c3952c646435e4&=&format=webp&quality=lossless&width=350&height=350"
                className="h-7 w-7 "
                alt="Signal Icon"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-xs mx-auto  bg-#FFFFFF rounded-lg overflow-hidden">
        <div className="flex justify-center mt-28">
          <div className="rounded-full border-4 border-white">
            <img
              src="https://media.discordapp.net/attachments/812390695864238201/1277922679961292831/images.png?ex=66ceedbd&is=66cd9c3d&hm=a5ef524af20d0ba4887bece2aaaf11503299abf009c4fa9113738631e405f4f9&=&format=webp&quality=lossless" // Update this path to your profile image
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
          <p className=" text-gray-600 text-sm">22 followers · 33 posts</p>
          <p className=" text-gray-600 text-sm">
            You don't follow each other on Instagram
          </p>
        </div>
        <div className="flex justify-center mt-2 mb-4">
          <button className="bg-[#EFEFEF] text-black px-3 py-1 font-semibold text-sm/[23px] rounded-md hover:bg-[#b8b0b0]">
            View profile
          </button>
        </div>
      </div>
      {initialTimestamp && (
            <div className="flex justify-center items-center text-sm text-gray-400 text-center mb-2">
              {formatDate(initialTimestamp)}
            </div>
          )}
    
    <div className="w-full flex items-center px-4 py-3">
      <div className="w-full max-w-sm p-6 text-black rounded-lg text-[14px]">
        <div className="overflow-y-auto h-96 mb-4">
          
          {responses.map((res, idx) => (
            <div key={idx} className="my-3">
              <div className="bg-[#EFEFEF] rounded-[20px] py-2 px-2.5 inline-block max-w-xs">
                {res.question}
              </div>
              <div className="bg-[#3797F0] rounded-[20px] py-2 px-2.5 inline-block max-w-xs text-white">
                {res.answer}
              </div>
            </div>
          ))}
          {currentQuestionIndex < questions.length && showNextMessage && (
            <div className="my-2 animate-fadeinright right-0">
              <div className="bg-[#EFEFEF] rounded-[20px] py-2 px-2.5 inline-block max-w-xs">
                {questions[currentQuestionIndex]}
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center">
          <input
            type="text"
            className="flex-1 p-2 bg-gray-700 rounded-md focus:outline-none"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 bg-blue-500 p-2 rounded-full hover:bg-blue-600"
          >
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
                strokeWidth="2"
                d="M5 12h14M5 12l6-6m-6 6l6 6"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}

