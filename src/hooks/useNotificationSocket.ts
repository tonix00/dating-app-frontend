import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const useNotificationSocket = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [socket, setSocket] = useState<Socket | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    // Connect to Node.js
    const newSocket = io("http://localhost:3000", {
      auth: { token },
    });

    newSocket.on("connect", () => {
      console.log("🔔 Notification socket connected!");
    });

    // Listen for instant notifications!
    newSocket.on("notification", (data) => {
      console.log("🔔 New notification received:", data);
      setUnreadCount((prev) => prev + 1);
    });

    newSocket.on("connect_error", (err) => {
      console.error("Notification socket error:", err.message);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [token]);

  const resetCount = () => setUnreadCount(0);

  return { unreadCount, resetCount };
};
