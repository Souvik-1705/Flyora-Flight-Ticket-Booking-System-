import React, { useState } from "react";

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!message.trim()) return;

        const userMsg = {
            sender: "user",
            text: message,
        };

        setMessages((prev) => [...prev, userMsg]);
        setMessage("");

        try {
            setLoading(true);
            const res = await fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: userMsg.text })
            });
            const data = await res.json();

            const aiMsg = {
                sender: "ai",
                text: data.reply || data.message
            }
            setMessages((prev) => [...prev, aiMsg]);
        } catch (error) {
            console.log(error);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "ai",
                    text: error.message || "Something went wrong,please try again later."
                }
            ])
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            {/* Floating Button */}

            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="
          fixed
          bottom-4 
          right-4 
          sm:bottom-6 
          sm:right-6
          bg-blue-600
          hover:bg-blue-700
          text-white
          w-16
          h-16
          rounded-full
          text-2xl
          shadow-xl
          z-50
        "
            >
                💬
            </button>

            {/* Chat Window */}

            {isOpen && (
                <div
                    className="
    fixed
    bottom-20 sm:bottom-24
    right-2 sm:right-6
    w-[90%] sm:w-[380px]
    h-[70vh] sm:h-[500px]
    bg-slate-900
    border
    border-slate-700
    rounded-2xl
    shadow-2xl
    z-50
    flex
    flex-col
  "
                >
                    <div
                        className="
              p-4
              border-b
              border-slate-700
            "
                    >
                        <h2 className="text-white font-bold">
                            ✈️ Flyora AI Assistant
                        </h2>
                    </div>

                    <div
                        className="
    flex-1
    p-4
    overflow-y-auto
    space-y-3
  "
                    >
                        {messages.length === 0 && (
                            <p className="text-slate-400 text-sm">
                                Ask me about flights ✈️
                            </p>
                        )}

                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`
        max-w-[80%]
        px-4
        py-2
        rounded-xl
        text-sm
        break-words
        ${msg.sender === "user"
                                        ? "bg-blue-600 text-white ml-auto"
                                        : "bg-slate-800 text-slate-200"
                                    }
      `}
                            >
                                {msg.text}
                            </div>
                        ))}

                        {loading && (
                            <p className="text-slate-400 text-sm">
                                AI is thinking...
                            </p>
                        )}
                    </div>
                    <div
                        className="
    border-t
    border-slate-700
    p-3
    flex
    gap-2
  "
                    >
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Ask about flights..."
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendMessage();
                                }
                            }}
                            className="
      flex-1
      bg-slate-800
      text-white
      px-3
      py-2
      rounded-lg
      outline-none
      border
      border-slate-700
      focus:border-blue-500
      text-xs sm:text-sm
    "
                        />

                        <button
                            onClick={sendMessage}
                            className="
                          bg-blue-600
                          hover:bg-blue-700
                            px-4
                            rounded-lg
                          text-white
                            text-sm
                        "
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}

        </>

    );
};

export default AIChatbot;