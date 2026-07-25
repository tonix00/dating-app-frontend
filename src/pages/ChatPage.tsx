import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { io, Socket } from "socket.io-client";

interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  match_id: number;
  content: string;
  created_at: string;
  createdAt?: string; // ← add this!
}

function ChatPage() {
  const location = useLocation();
  const { matchId, receiverId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUserId = parseInt(localStorage.getItem("userId") || "0");
  const token = localStorage.getItem("token");

  const chatState = location.state as { name: string; photo: string } | null;
  const chatName = chatState?.name || "Chat";
  const chatPhoto = chatState?.photo || null;

  useEffect(() => {
    // Connect to Node.js messaging service
    const newSocket = io("http://localhost:3000", {
      auth: { token },
    });

    newSocket.on("connect", () => {
      console.log("Connected to messaging service!");
      setConnected(true);

      // Get chat history
      newSocket.emit("get_messages", { matchId: parseInt(matchId!) });
    });

    newSocket.on("connect_error", (err) => {
      console.error("Connection error:", err.message);
    });

    newSocket.on("chat_history", (msgs: Message[]) => {
      setMessages(msgs);
      scrollToBottom();
    });

    newSocket.on("receive_message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
      scrollToBottom();
    });

    newSocket.on("message_sent", (data: any) => {
      setMessages((prev) => [...prev, data.message]);
      scrollToBottom();
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [matchId]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !socket) return;

    socket.emit("send_message", {
      receiverId: parseInt(receiverId!),
      matchId: parseInt(matchId!),
      content: newMessage,
    });

    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="max-w-2xl mx-auto h-[calc(100vh-140px)] flex flex-col">
      {/* Header */}
      <div className="bg-white rounded-t-2xl shadow p-4 flex items-center gap-3">
        <button
          onClick={() => navigate("/matches")}
          className="text-gray-400 hover:text-gray-600"
        >
          ←
        </button>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          {chatPhoto ? (
            <img
              src={`http://localhost:8080${chatPhoto}`}
              alt={chatName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold">
              {chatName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div>
          <h3 className="font-bold text-gray-800">{chatName}</h3>
          <p className="text-xs text-gray-400">
            {connected ? "🟢 Connected" : "🔴 Connecting..."}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 bg-gray-50 p-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">No messages yet! Say hello! 👋</p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg, index) => {
              const isMe = msg.sender_id === currentUserId;
              return (
                <div
                  key={index}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                      isMe
                        ? "bg-pink-500 text-white rounded-br-none"
                        : "bg-white text-gray-800 shadow rounded-bl-none"
                    }`}
                  >
                    {msg.content}
                    <p
                      className={`text-xs mt-1 ${
                        isMe ? "text-pink-100" : "text-gray-400"
                      }`}
                    >
                      {new Date(
                        msg.created_at || msg.createdAt || Date.now(),
                      ).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="bg-white rounded-b-2xl shadow p-4 flex gap-3">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message... (Enter to send)"
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
        />
        <button
          onClick={sendMessage}
          disabled={!newMessage.trim() || !connected}
          className="bg-pink-500 hover:bg-pink-600 text-white w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-50 transition"
        >
          ➤
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
