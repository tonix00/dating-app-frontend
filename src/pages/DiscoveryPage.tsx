import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useOnlineUsers } from "../hooks/useOnlineUsers";

interface DiscoveryUser {
  id: number;
  email: string;
  fullName?: string;
  age?: number;
  bio?: string;
  gender?: string;
  location?: string;
  photo1Url?: string;
  photo2Url?: string;
  photo3Url?: string;
}

function DiscoveryPage() {
  const [users, setUsers] = useState<DiscoveryUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const navigate = useNavigate();

  const { isOnline } = useOnlineUsers();

  useEffect(() => {
    fetchUsers();
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/api/discovery");
      if (response.data.success) {
        setUsers(response.data.data.content);
      }
    } catch (err) {
      console.error("Error fetching users!");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (userId: number) => {
    try {
      const response = await axiosInstance.post(`/api/matches/like/${userId}`);
      setMessage(response.data.message);
      if (!isDesktop) setCurrentIndex((prev) => prev + 1);
      else {
        // Remove liked user from list on desktop
        setUsers((prev) => prev.filter((u) => u.id !== userId));
      }
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Something went wrong!");
    }
  };

  const handleSkip = async (userId: number) => {
    try {
      // Save skip to database!
      await axiosInstance.post(`/api/matches/skip/${userId}`);
    } catch (err) {
      console.error("Error skipping user!");
    }

    setMessage("");
    if (!isDesktop) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    }
  };

  const handleReset = async () => {
    try {
      await axiosInstance.delete("/api/matches/skip/reset");
      setCurrentIndex(0);
      fetchUsers();
      setMessage("");
    } catch (err) {
      console.error("Error resetting skips!");
    }
  };

  const UserCard = ({ user }: { user: DiscoveryUser }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Photo */}
      <div
        className="h-48 bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center relative cursor-pointer"
        onClick={() => navigate(`/profile/view/${user.id}`)}
      >
        {user.photo1Url ? (
          <img
            src={`http://localhost:8080${user.photo1Url}`}
            alt={user.fullName}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-6xl text-white font-bold">
            {(user.fullName || user.email).charAt(0).toUpperCase()}
          </span>
        )}

        {/* Online indicator!! */}
        {isOnline(user.id) && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            Online
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3
            className="text-lg font-bold text-gray-800 cursor-pointer hover:text-pink-500"
            onClick={() => navigate(`/profile/view/${user.id}`)}
          >
            {user.fullName || user.email}
          </h3>
          {user.age && (
            <span className="text-gray-500 font-medium">{user.age}</span>
          )}
        </div>

        {user.location && (
          <p className="text-gray-400 text-sm mb-2">📍 {user.location}</p>
        )}

        {user.bio && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{user.bio}</p>
        )}

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/profile/view/${user.id}`)}
            className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium transition"
          >
            👀 View
          </button>
          <button
            onClick={() => handleSkip(user.id)}
            className="py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-xl transition"
          >
            ❌
          </button>
          <button
            onClick={() => handleLike(user.id)}
            className="py-2 px-3 bg-pink-100 hover:bg-pink-200 rounded-xl text-xl transition"
          >
            ❤️
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Finding people for you... 💕</p>
      </div>
    );
  }

  // Desktop grid view
  if (isDesktop) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Discover People 💕
        </h2>

        {message && (
          <div
            className={`p-4 rounded-lg text-center font-medium mb-4 ${
              message.includes("MATCH")
                ? "bg-pink-100 text-pink-600"
                : "bg-blue-50 text-blue-600"
            }`}
          >
            {message}
          </div>
        )}

        {users.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <p className="text-4xl">😢</p>
            <p className="text-gray-500 text-xl">No more people to discover!</p>
            <div className="flex gap-3">
              <button
                onClick={() => fetchUsers()}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg"
              >
                🔄 Refresh
              </button>
              <button
                onClick={handleReset}
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg"
              >
                💕 Give Everyone Another Chance!
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Mobile single card view
  const currentUser = users[currentIndex];

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-4xl">😢</p>
        <p className="text-gray-500 text-xl">No more people to discover!</p>
        <button
          onClick={() => {
            setCurrentIndex(0);
            fetchUsers();
          }}
          className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-2xl font-bold text-gray-800">Discover People 💕</h2>

      {message && (
        <div
          className={`p-4 rounded-lg text-center font-medium w-full ${
            message.includes("MATCH")
              ? "bg-pink-100 text-pink-600"
              : "bg-blue-50 text-blue-600"
          }`}
        >
          {message}
        </div>
      )}

      <div className="w-full max-w-sm">
        <UserCard user={currentUser} />
      </div>

      <p className="text-gray-400 text-sm">
        {currentIndex + 1} of {users.length} people
      </p>
    </div>
  );
}

export default DiscoveryPage;
