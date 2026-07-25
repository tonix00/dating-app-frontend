import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

interface Profile {
  id: number;
  fullName: string;
  age: number;
  gender: string;
  bio: string;
  location: string;
  occupation: string;
  education: string;
  height: string;
  religion: string;
  drinkingHabit: string;
  smokingHabit: string;
  interestedIn: string;
  relationshipGoal: string;
  photo1Url: string;
  photo2Url: string;
  photo3Url: string;
  user: { id: number; email: string };
}

function ViewProfilePage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get(`/api/profiles/user/${userId}`);
      if (response.data.success) {
        setProfile(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching profile!");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      const response = await axiosInstance.post(`/api/matches/like/${userId}`);
      setMessage(response.data.message);
      setTimeout(() => navigate("/"), 2000);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Something went wrong!");
    }
  };

  const handleSkip = async () => {
    try {
      await axiosInstance.post(`/api/matches/skip/${userId}`);
    } catch (err) {
      console.error("Error skipping!");
    }
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading profile... 💕</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Profile not found!</p>
      </div>
    );
  }

  const photos = [
    profile.photo1Url,
    profile.photo2Url,
    profile.photo3Url,
  ].filter(Boolean);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="text-pink-500 font-medium mb-4 flex items-center gap-2 hover:text-pink-600"
      >
        ← Back to Discovery
      </button>

      {/* Match message */}
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

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Photo gallery */}
        {/* Photo gallery */}
        <div className="relative h-80 bg-gradient-to-br from-pink-400 to-purple-400">
          {photos.length > 0 ? (
            <>
              <img
                src={`http://localhost:8080${photos[activePhoto]}`}
                alt={profile.fullName}
                className="w-full h-full object-cover"
              />

              {/* Left arrow */}
              {activePhoto > 0 && (
                <button
                  type="button"
                  onClick={() => setActivePhoto((prev) => prev - 1)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center text-gray-800 font-bold"
                >
                  ←
                </button>
              )}

              {/* Right arrow */}
              {activePhoto < photos.length - 1 && (
                <button
                  type="button"
                  onClick={() => setActivePhoto((prev) => prev + 1)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center text-gray-800 font-bold"
                >
                  →
                </button>
              )}

              {/* Photo counter */}
              <div className="absolute top-3 right-3 bg-black/40 text-white text-xs px-2 py-1 rounded-full">
                {activePhoto + 1} / {photos.length}
              </div>

              {/* Photo dots */}
              {photos.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {photos.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActivePhoto(index)}
                      className={`w-3 h-3 rounded-full transition ${
                        index === activePhoto ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-8xl text-white font-bold">
                {profile.fullName?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Profile info */}
        <div className="p-6">
          {/* Name and age */}
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-bold text-gray-800">
              {profile.fullName}
            </h2>
            <span className="text-2xl font-medium text-gray-500">
              {profile.age}
            </span>
          </div>

          {/* Location */}
          {profile.location && (
            <p className="text-gray-400 mb-4">📍 {profile.location}</p>
          )}

          {/* Bio */}
          {profile.bio && (
            <p className="text-gray-600 mb-6 leading-relaxed">{profile.bio}</p>
          )}

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {profile.occupation && (
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400">Occupation</p>
                <p className="font-medium text-gray-700">
                  💼 {profile.occupation}
                </p>
              </div>
            )}
            {profile.education && (
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400">Education</p>
                <p className="font-medium text-gray-700">
                  🎓 {profile.education}
                </p>
              </div>
            )}
            {profile.height && (
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400">Height</p>
                <p className="font-medium text-gray-700">📏 {profile.height}</p>
              </div>
            )}
            {profile.religion && (
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400">Religion</p>
                <p className="font-medium text-gray-700">
                  🙏 {profile.religion}
                </p>
              </div>
            )}
            {profile.drinkingHabit && (
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400">Drinking</p>
                <p className="font-medium text-gray-700">
                  🍺 {profile.drinkingHabit}
                </p>
              </div>
            )}
            {profile.smokingHabit && (
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400">Smoking</p>
                <p className="font-medium text-gray-700">
                  🚬 {profile.smokingHabit}
                </p>
              </div>
            )}
            {profile.relationshipGoal && (
              <div className="bg-gray-50 rounded-xl p-3 col-span-2">
                <p className="text-xs text-gray-400">Looking For</p>
                <p className="font-medium text-gray-700">
                  💕 {profile.relationshipGoal}
                </p>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleSkip}
              className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-xl font-medium transition"
            >
              ❌ Skip
            </button>
            <button
              onClick={handleLike}
              className="flex-1 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-xl font-medium transition"
            >
              ❤️ Like
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProfilePage;
