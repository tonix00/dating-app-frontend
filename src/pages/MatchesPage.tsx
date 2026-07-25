import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

interface Match {
  id: number;
  matchedAt: string;
  matchedUser: {
    id: number;
    email: string;
    fullName?: string;
    photo1Url?: string;
  };
}

function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await axiosInstance.get("/api/matches/my-matches");
      if (response.data.success) {
        setMatches(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching matches!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading matches... 💕</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        My Matches 💕
        <span className="text-pink-500 ml-2">({matches.length})</span>
      </h2>

      {matches.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-8 text-center">
          <p className="text-4xl mb-4">💔</p>
          <p className="text-gray-500">No matches yet!</p>
          <p className="text-gray-400 text-sm mt-2">
            Keep swiping to find your match!
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {matches.map((match) => (
            <div
              key={match.id}
              className="bg-white rounded-2xl shadow p-6 flex items-center gap-4 hover:shadow-md transition cursor-pointer"
            >
              {/* Avatar */}
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex-shrink-0 overflow-hidden">
                {match.matchedUser.photo1Url ? (
                  <img
                    src={`http://localhost:8080${match.matchedUser.photo1Url}`}
                    alt={match.matchedUser.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl text-white font-bold">
                    {(match.matchedUser.fullName || match.matchedUser.email)
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">
                  {match.matchedUser.fullName || match.matchedUser.email}
                </h3>
                <p className="text-gray-400 text-sm">
                  Matched on {new Date(match.matchedAt).toLocaleDateString()}
                </p>
              </div>

              {/* Message button */}
              <button
                onClick={() =>
                  navigate(`/chat/${match.id}/${match.matchedUser.id}`, {
                    state: {
                      name:
                        match.matchedUser.fullName || match.matchedUser.email,
                      photo: match.matchedUser.photo1Url,
                    },
                  })
                }
                className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                Message 💬
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MatchesPage;
