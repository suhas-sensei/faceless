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
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

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

  const router = useRouter();
  const questions = [
    "Hello from faceless, how's it going today?",
    "What's your email? We'll send the meeting link here.",
    "What's your preferred date for the meeting? eg. 19th Oct",
    "Mention the time in AM/PM. Available between 11am to 2am.",
    "That's all we need to know. We'll send you the payment link now, then verify the transaction and rest assured, will reach you regarding the details via email. If you feel you've made a mistake, kindly refresh the page. Type anything to continue.",
  ];
  const [showProfile, setShowProfile] = useState(true);  // Add this state
 
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [responses, setResponses] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [input, setInput] = useState("");
  const [initialTimestamp, setInitialTimestamp] = useState(null);
  const [showNextMessage, setShowNextMessage] = useState(false);
  const messagesEndRef = useRef(null);

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
  
      if (currentQuestionIndex === questions.length - 1) {
        setShowPaymentPopup(true);
      }
  
      // Hide the profile section after the first message
      if (currentQuestionIndex === 0) {
        setShowProfile(false);
      }
    }
  };
  
  useEffect(() => {
    if (responses.length > 0 && responses.length === questions.length) {
      (async () => {
        try {
          const dataToSend = responses.map((res) => ({
            Question: res.question,

            Answer: String(res.answer),
          }));

          console.log("Sending this data to SheetDB:", dataToSend);

          const response = await fetch(
            "https://sheetdb.io/api/v1/jnex71dn260ow",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                data: dataToSend,
              }),
            }
          );

          if (response.ok) {
            console.log("Data saved successfully");
          } else {
            const errorData = await response.json();
            console.error("Error saving data:", errorData);
          }
        } catch (error) {
          console.error("Error during fetch:", error);
        }
      })();
    } else if (responses.length > 0) {
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setShowNextMessage(true);
      }, 800);
    }
  }, [responses, questions.length, router]);

  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 100);
    return () => clearTimeout(scrollTimeout);
  }, [responses, currentQuestionIndex]);

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
              width={80}
              height={24}
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
            width={40}
            height={40}
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
                width={24}
                height={24}
              />
            </button>

            <button className="text-black">
              <Image
                src="/vidcall.png"
                className="h-7 w-7"
                alt="Video Call Icon"
                width={28}
                height={28}
              />
            </button>
          </div>
        </div>

        {/* Profile bIG */}
        {showProfile && (
  <div className="flex flex-col justify-end flex-grow overflow-hidden pt-2 pb-20 px-4 scrollbar-hide">
    <div className="max-w-xs mx-auto bg-#FFFFFF rounded-lg overflow-hidden mt-28">
      {/* Profile Section */}
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
              <p className="text-gray-600 text-sm">
                22 followers · 33 posts
              </p>
              <p className="text-gray-600 text-sm">
                You don&apos;t follow each other on Instagram
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-2">
        <a href="/about">
          <button className="bg-[#EFEFEF] text-black px-3 py-1 font-semibold text-sm/[23px] rounded-md hover:bg-[#b8b0b0]">
            About us
          </button>
        </a>
      </div>
    </div>
  </div>
)}

        {/* Chat Window */}
        {initialTimestamp && (
          <div className="flex justify-center items-center text-sm text-gray-400 mb-2 mt-36">
            {formatDate(initialTimestamp)}
          </div>
        )}

        <div
          className="flex-grow-0 h-[25vh] h-md:h-[100vh] h-lg:h-[100vh] overflow-y-auto scrollbar-hide"
          // ref={chatContainerRef}
        >
          <div className="w-full max-w-sm mx-auto text-black rounded-lg text-[14px] px-3">
            {responses.map((res, idx) => (
              <div key={idx} className="">
                {/* Question on the left */}
                <div classNapx-4me="flex justify-start ">
                  <div className="bg-[#EFEFEF] rounded-[20px] py-2 px-2.5 inline-block max-w-xs">
                    {res.question}
                  </div>
                </div>
                {/* Answer on the right */}
                <div className="flex justify-end mt-2">
                  <div className="bg-[#3797F0] rounded-[20px] py-2 px-2.5 inline-block max-w-xs text-white mb-2">
                    {res.answer}
                  </div>
                </div>
              </div>
            ))}
            {currentQuestionIndex < questions.length && showNextMessage && (
              <div className="animate-fadeinright right-0">
                <div className="bg-[#EFEFEF] rounded-[20px] py-2 px-2.5 inline-block max-w-xs">
                  {questions[currentQuestionIndex]}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      {/* Payment Popup Modal */}
      {showPaymentPopup && (
        <div className="fixed inset-0 bg-[#3e3e3e] bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white shadow-lg p-6 rounded-[20px] text-center relative w-11/12 max-w-xs md:max-w-md lg:max-w-lg">
            {/* Close button (X) */}
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={() => setShowPaymentPopup(false)}
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
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Checkmark Icon using Image from public/tick.png */}
            <div className="flex justify-center mb-4">
              <Image
                src="/tick.png"
                alt="Checkmark"
                width={60}
                height={60}
                className="h-10 w-10 md:h-12 md:w-12"
              />
            </div>

            <h2 className="text-2xl font-bold mb-2">Awesome!</h2>
            <p className="text-gray-500 mb-4">
              You&apos;re ready to proceed with the payment.
            </p>

            <div className="mt-4">
              <a
                href="upi://pay?pa=suhas.ghosal2002@okaxis&pn=Suhas%20Ghosal&am=129.00&cu=INR&aid=uGICAgIDrp7vSHg"
                target="_blank"
                className="bg-[#0071e3] text-white px-4 py-2 rounded-full inline-block hover:bg-[#0071e3]"
              >
                Pay via UPI
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Input Box */}
      <div className="fixed bottom-0 left-0 w-full bg-white px-4 py-4">
        <div className="flex items-center max-w-sm mx-auto">
          <input
            type="text"
            className="flex-1 p-2  rounded-[20px] border-2 border-[#F7ACAC]focus:outline-none"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 bg-[#3797F0] p-2 rounded-full hover:bg-blue-600"
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
  );
}
