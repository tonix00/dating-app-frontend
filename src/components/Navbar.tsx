import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNotificationSocket } from "../hooks/useNotificationSocket";

function Navbar() {
  const navigate = useNavigate();
  const [initialUnreadCount, setInitialUnreadCount] = useState(0);
  const { unreadCount: socketCount, resetCount } = useNotificationSocket();

  // Total = initial unread + new ones from socket
  const totalUnread = initialUnreadCount + socketCount;

  useEffect(() => {
    fetchInitialUnreadCount();
  }, []);

  const fetchInitialUnreadCount = async () => {
    try {
      const response = await axiosInstance.get("/api/notifications");
      if (response.data.success) {
        setInitialUnreadCount(response.data.data.unreadCount);
      }
    } catch (err) {
      console.error("Error fetching notifications!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const handleNotificationsClick = async () => {
    try {
      // Mark all as read in database!
      await axiosInstance.put("/api/notifications/mark-all-read");
    } catch (err) {
      console.error("Error marking as read!");
    }
    resetCount();
    setInitialUnreadCount(0);
    navigate("/notifications");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div
        className="text-2xl font-bold text-pink-500 cursor-pointer"
        onClick={() => navigate("/")}
      >
        💕 Dating App
      </div>

      {/* Navigation links */}
      <div className="flex gap-6 items-center">
        <button
          onClick={() => navigate("/")}
          className="text-gray-600 hover:text-pink-500 font-medium transition cursor-pointer"
        >
          Discovery
        </button>
        <button
          onClick={() => navigate("/matches")}
          className="text-gray-600 hover:text-pink-500 font-medium transition cursor-pointer"
        >
          Matches
        </button>
        <button
          onClick={handleNotificationsClick}
          className="text-gray-600 hover:text-pink-500 font-medium transition relative cursor-pointer"
        >
          🔔
          {totalUnread > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalUnread}
            </span>
          )}
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="text-gray-600 hover:text-pink-500 font-medium transition cursor-pointer"
        >
          Profile
        </button>
        <button
          onClick={handleLogout}
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-medium transition cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
