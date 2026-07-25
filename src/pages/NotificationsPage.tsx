import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

interface Notification {
  id: number;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
  sender: { id: number; email: string };
}

function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleNotificationClick = async (notification: Notification) => {
    if (notification.type === "LIKE") {
      navigate(`/profile/view/${notification.sender.id}`);
    } else if (notification.type === "MATCH") {
      try {
        const response = await axiosInstance.get("/api/matches/my-matches");
        if (response.data.success) {
          const matches = response.data.data;
          const match = matches.find(
            (m: any) => m.matchedUser?.id === notification.sender.id,
          );
          if (match) {
            navigate(`/chat/${match.id}/${notification.sender.id}`, {
              state: {
                name: match.matchedUser.fullName || match.matchedUser.email,
                photo: match.matchedUser.photo1Url,
              },
            });
          }
        }
      } catch (err) {
        console.error("Error finding match!", err);
      }
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axiosInstance.get("/api/notifications");
      if (response.data.success) {
        setNotifications(response.data.data.notifications);
        setUnreadCount(response.data.data.unreadCount);
      }
    } catch (err) {
      console.error("Error fetching notifications!");
    } finally {
      setLoading(false);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axiosInstance.put("/api/notifications/mark-all-read");
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.error("Error marking as read!");
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "LIKE":
        return "❤️";
      case "MATCH":
        return "🎉";
      default:
        return "🔔";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading notifications...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Notifications 🔔
          {unreadCount > 0 && (
            <span className="ml-2 bg-pink-500 text-white text-sm px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </h2>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-pink-500 hover:text-pink-600 text-sm font-medium"
          >
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-8 text-center">
          <p className="text-4xl mb-4">🔔</p>
          <p className="text-gray-500">No notifications yet!</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`bg-white rounded-2xl shadow p-4 flex items-center gap-4 
                  ${!notification.read ? "border-l-4 border-pink-500" : ""}
                  ${
                    notification.type === "LIKE" ||
                    notification.type === "MATCH"
                      ? "cursor-pointer hover:shadow-md transition"
                      : ""
                  }
              `}
            >
              {/* Icon */}
              <div className="text-2xl">
                {getNotificationIcon(notification.type)}
              </div>

              {/* Content */}
              <div className="flex-1">
                <p
                  className={`${!notification.read ? "font-semibold text-gray-800" : "text-gray-600"}`}
                >
                  {notification.message}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Unread indicator */}
              {!notification.read && (
                <div className="w-2 h-2 bg-pink-500 rounded-full flex-shrink-0"></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotificationsPage;
