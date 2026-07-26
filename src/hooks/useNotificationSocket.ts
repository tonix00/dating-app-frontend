import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const useNotificationSocket = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const newSocket = io(
      import.meta.env.VITE_SOCKET_URL || "http://localhost:3000",
      {
        auth: { token },
      },
    );

    newSocket.on("connect", () => {
      console.log("🔔 Notification socket connected!");
    });

    newSocket.on("notification", (data) => {
      console.log("🔔 New notification received:", data);
      setUnreadCount((prev) => prev + 1);
    });

    newSocket.on("connect_error", (err) => {
      console.error("Notification socket error:", err.message);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [token]);

  const resetCount = () => setUnreadCount(0);

  return { unreadCount, resetCount };
};
