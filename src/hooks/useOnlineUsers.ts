import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const useOnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState<Set<number>>(new Set());
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const socket: Socket = io(
      import.meta.env.VITE_SOCKET_URL || "http://localhost:3000",
      {
        auth: { token },
      },
    );

    socket.on("connect", () => {
      // Get current online users
      socket.emit("get_online_users");
    });

    // Receive initial online users list
    socket.on("online_users", (users: number[]) => {
      setOnlineUsers(new Set(users.map(Number)));
    });

    // Someone came online
    socket.on("user_online", (data: { userId: number }) => {
      setOnlineUsers((prev) => new Set([...prev, Number(data.userId)]));
    });

    // Someone went offline
    socket.on("user_offline", (data: { userId: number }) => {
      setOnlineUsers((prev) => {
        const next = new Set(prev);
        next.delete(Number(data.userId));
        return next;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);

  const isOnline = (userId: number) => onlineUsers.has(userId);

  return { onlineUsers, isOnline };
};
