import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:3000");

function App() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]); // Store received messages

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return; // Prevent empty messages

    socket.emit("message", message);
    setMessage(""); 
    console.log("Message sent:", message);
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("message", (newMessage: string) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]); // Append new message
    });

    return () => {
      socket.off("message"); // Clean up listener
      console.log("Disconnected from server");
    };
  }, []);

  

  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-4">
        <h1 className="text-3xl font-bold text-purple-900">Hello Message </h1>
        <div className="space-y-2">
          {messages.map((msg, index) => (
            <p key={index} className="text-2xl text-gray-900">
              {msg}
            </p>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 justify-center">
        <input
          className="ring-1 p-3"
          type="text"
          name="message"
          placeholder="Enter a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="p-3 bg-blue-500 text-white rounded">
          Send
        </button>
      </form>
    </>
  );
}

export default App;
