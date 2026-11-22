"use client";

import { vapi } from "@/lib/vapi";
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";

function VapiWidget() {
  const [callActive, setCallActive] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [callEnded, setCallEnded] = useState(false);

  const { user, isLoaded } = useUser();
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // auto-scroll 
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  //  event listeners for VAPI
  useEffect(() => {
    const handleCallStart = () => {
      console.log("Call started");
      setConnecting(false);
      setCallActive(true);
      setCallEnded(false);
    };

    const handleCallEnd = () => {
      console.log("Call ended");
      setCallActive(false);
      setConnecting(false);
      setIsSpeaking(false);
      setCallEnded(true);
    };

    const handleSpeechStart = () => {
      console.log("AI started Speaking");
      setIsSpeaking(true);
    };

    const handleSpeechEnd = () => {
      console.log("AI stopped Speaking");
      setIsSpeaking(false);
    };

    const handleMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { content: message.transcript, role: message.role };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const handleError = (error: any) => {
      console.log("Vapi Error", error);
      setConnecting(false);
      setCallActive(false);
    };

    vapi
      .on("call-start", handleCallStart)
      .on("call-end", handleCallEnd)
      .on("speech-start", handleSpeechStart)
      .on("speech-end", handleSpeechEnd)
      .on("message", handleMessage)
      .on("error", handleError);

    // cleanup event listeners on unmount
    return () => {
      vapi
        .off("call-start", handleCallStart)
        .off("call-end", handleCallEnd)
        .off("speech-start", handleSpeechStart)
        .off("speech-end", handleSpeechEnd)
        .off("message", handleMessage)
        .off("error", handleError);
    };
  }, []);

  const toggleCall = async () => {
    if (callActive) vapi.stop();
    else {
      try {
        setConnecting(true);
        setMessages([]);
        setCallEnded(false);

        await vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID);
      } catch (error) {
        console.log("Failed to start call", error);
        setConnecting(false);
      }
    }
  };

  if (!isLoaded) return null;

  const listening = callActive && !isSpeaking;

  return (
    <div className="max-w-5xl mx-auto px-4 flex flex-col overflow-hidden pb-20">
      {/* TITLE */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-mono">
          <span>Talk to Your </span>
          <span className="text-foreground/80">AI </span>
          <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
            Dental Assistant
          </span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Have a voice conversation with our AI assistant for dental advice and guidance
        </p>
      </div>

      {/* VIDEO CALL AREA */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* AI ASSISTANT CARD */}

        <Card
          className={`bg-card/90 backdrop-blur-sm border overflow-hidden relative transition-all duration-500 ${
            isSpeaking
              ? "border-pink-400/50 shadow-lg shadow-pink-500/10"
              : "border-border"
          }`}
        >
          <div className="aspect-video flex flex-col items-center justify-center p-6 relative">
            {/* AI VOICE ANIMATION */}
            <div
              className={`absolute inset-0 ${
                isSpeaking ? "opacity-100" : "opacity-0"
              } transition-opacity duration-500`}
            >
              {/* voice wave animation when speaking */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-center items-center h-24">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className={`mx-1 w-1.5 rounded-full bg-gradient-to-t from-orange-400 via-pink-400 to-purple-500 opacity-30 ${
                      isSpeaking ? "h-20 animate-sound-wave" : "h-[5%]"
                    }`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>

            {/* AI LOGO */}
            <div className="relative size-32 mb-4">
              {/* ripple rings while speaking or connecting */}
              {(isSpeaking || connecting) && (
                <>
                  <span className="absolute inset-0 rounded-full border-2 border-pink-400/50 animate-ripple" />
                  <span
                    style={{ animationDelay: "1.2s" }}
                    className="absolute inset-0 rounded-full border-2 border-purple-400/50 animate-ripple"
                  />
                </>
              )}

              <div
                className={`absolute inset-0 bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 rounded-full blur-lg transition-opacity duration-500 ${
                  isSpeaking ? "opacity-40 animate-pulse" : "opacity-10"
                }`}
              />

              <div
                className={`relative w-full h-full rounded-full bg-card flex items-center justify-center border overflow-hidden transition-colors duration-500 ${
                  isSpeaking ? "border-pink-400" : "border-border"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-orange-400/10 to-purple-500/10"></div>
                <Image
                  src="/logo.png"
                  alt="AI Dental Assistant"
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain"
                />
              </div>
            </div>

            <h2 className="text-xl font-bold text-foreground">DentTalk AI</h2>
            <p className="text-sm text-muted-foreground mt-1">Dental Assistant</p>

            {/* SPEAKING INDICATOR */}
            <div
              className={`mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-card border transition-colors duration-300 ${
                isSpeaking ? "border-pink-400" : "border-border"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  isSpeaking
                    ? "bg-pink-400 animate-pulse"
                    : callActive
                    ? "bg-pink-400/50"
                    : "bg-muted"
                }`}
              />

              <span className="text-xs text-muted-foreground">
                {isSpeaking
                  ? "Speaking..."
                  : callActive
                  ? "Listening..."
                  : connecting
                  ? "Connecting..."
                  : callEnded
                  ? "Call ended"
                  : "Waiting..."}
              </span>
            </div>
          </div>
        </Card>

        {/* USER CARD */}
        <Card
          className={`bg-card/90 backdrop-blur-sm border overflow-hidden relative transition-all duration-500 ${
            listening
              ? "border-purple-400/50 shadow-lg shadow-purple-500/10"
              : "border-border"
          }`}
        >
          <div className="aspect-video flex flex-col items-center justify-center p-6 relative">
            {/* User Image */}
            <div className="relative size-32 mb-4">
              {/* ripple rings while the AI is listening to the user */}
              {listening && (
                <>
                  <span className="absolute inset-0 rounded-full border-2 border-orange-400/50 animate-ripple" />
                  <span
                    style={{ animationDelay: "1.2s" }}
                    className="absolute inset-0 rounded-full border-2 border-purple-400/50 animate-ripple"
                  />
                </>
              )}

              <Image
                src={user?.imageUrl ?? "/logo.png"}
                alt="User"
                width={128}
                height={128}
                className={`relative size-full object-cover rounded-full border-2 transition-colors duration-500 ${
                  listening ? "border-purple-400" : "border-transparent"
                }`}
              />
            </div>

            <h2 className="text-xl font-bold text-foreground">You</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {user ? (user.firstName + " " + (user.lastName || "")).trim() : "Guest"}
            </p>

            {/* User Ready Text */}
            <div
              className={`mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-card border transition-colors duration-300 ${
                listening ? "border-purple-400" : "border-border"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  listening ? "bg-purple-400 animate-pulse" : "bg-muted"
                }`}
              />
              <span className="text-xs text-muted-foreground">
                {listening ? "Your turn" : callActive ? "Connected" : "Ready"}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* MESSAGE CONTAINER */}
      {messages.length > 0 && (
        <div
          ref={messageContainerRef}
          className="w-full bg-card/90 backdrop-blur-sm border border-border rounded-xl p-4 mb-8 h-64 overflow-y-auto transition-all duration-300 scroll-smooth"
        >
          <div className="space-y-3">
            {messages.map((msg, index) => (
              <div key={index} className="message-item animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div
                  className={`font-semibold text-xs mb-1 ${
                    msg.role === "assistant" ? "text-pink-400" : "text-muted-foreground"
                  }`}
                >
                  {msg.role === "assistant" ? "DentTalk AI" : "You"}:
                </div>
                <p className="text-foreground">{msg.content}</p>
              </div>
            ))}

            {callEnded && (
              <div className="message-item animate-in fade-in duration-300">
                <div className="font-semibold text-xs text-purple-400 mb-1">System:</div>
                <p className="text-foreground">Call ended. Thank you for using DentTalk AI!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CALL CONTROLS */}
      <div className="w-full flex justify-center gap-4">
        <Button
          className={`w-44 text-xl rounded-3xl overflow-hidden ${
            callActive
              ? "bg-destructive hover:bg-destructive/90 shadow-lg shadow-destructive/30"
              : callEnded
              ? "bg-red-500 hover:bg-red-700"
              : "bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 hover:brightness-110 shadow-lg shadow-pink-500/30"
          } text-white relative transition-all duration-300`}
          onClick={toggleCall}
          disabled={connecting || callEnded}
        >
          {connecting && (
            <span className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
              <span className="block w-1/3 h-full bg-white/70 animate-loading-sweep" />
            </span>
          )}

          <span>
            {callActive
              ? "End Call"
              : connecting
              ? "Connecting..."
              : callEnded
              ? "Call Ended"
              : "Start Call"}
          </span>
        </Button>
      </div>
    </div>
  );
}

export default VapiWidget;