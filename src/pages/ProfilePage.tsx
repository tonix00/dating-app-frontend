import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

function ProfilePage() {
  // Basic info
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");

  // Personal info
  const [occupation, setOccupation] = useState("");
  const [education, setEducation] = useState("");
  const [height, setHeight] = useState("");
  const [religion, setReligion] = useState("");
  const [drinkingHabit, setDrinkingHabit] = useState("");
  const [smokingHabit, setSmokingHabit] = useState("");

  // Looking for
  const [interestedIn, setInterestedIn] = useState("");
  const [relationshipGoal, setRelationshipGoal] = useState("");
  const [minAgePreference, setMinAgePreference] = useState("");
  const [maxAgePreference, setMaxAgePreference] = useState("");

  const [photo1, setPhoto1] = useState<string | null>(null);
  const [photo2, setPhoto2] = useState<string | null>(null);
  const [photo3, setPhoto3] = useState<string | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/api/profiles/me");
        if (response.data.success && response.data.data) {
          const p = response.data.data;
          setFullName(p.fullName || "");
          setAge(p.age || "");
          setGender(p.gender || "");
          setBio(p.bio || "");
          setLocation(p.location || "");
          setOccupation(p.occupation || "");
          setEducation(p.education || "");
          setHeight(p.height || "");
          setReligion(p.religion || "");
          setDrinkingHabit(p.drinkingHabit || "");
          setSmokingHabit(p.smokingHabit || "");
          setInterestedIn(p.interestedIn || "");
          setRelationshipGoal(p.relationshipGoal || "");
          setMinAgePreference(p.minAgePreference || "");
          setMaxAgePreference(p.maxAgePreference || "");
          setPhoto1(
            p.photo1Url
              ? `${import.meta.env.VITE_API_URL || "http://localhost:8080"}${p.photo1Url}`
              : null,
          );
          setPhoto2(
            p.photo2Url
              ? `${import.meta.env.VITE_API_URL || "http://localhost:8080"}${p.photo2Url}`
              : null,
          );
          setPhoto3(
            p.photo3Url
              ? `${import.meta.env.VITE_API_URL || "http://localhost:8080"}${p.photo3Url}`
              : null,
          );
        }
      } catch (err: any) {
        if (err.response?.status === 404) {
          console.log("No profile yet!");
        }
      } finally {
        setFetching(false);
      }
    };
    fetchProfile();
  }, []);

  const handlePhotoUpload = async (photoNumber: number, file: File) => {
    setUploadingPhoto(photoNumber);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosInstance.post(
        `/api/photos/upload/${photoNumber}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.success) {
        const photoUrl = `${import.meta.env.VITE_API_URL || "http://localhost:8080"}${response.data.data}`;
        if (photoNumber === 1) setPhoto1(photoUrl);
        if (photoNumber === 2) setPhoto2(photoUrl);
        if (photoNumber === 3) setPhoto3(photoUrl);
        setSuccess("Photo uploaded successfully!");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to upload photo!");
    } finally {
      setUploadingPhoto(null);
    }
  };

  const handlePhotoDelete = async (photoNumber: number) => {
    try {
      await axiosInstance.delete(`/api/photos/${photoNumber}`);
      if (photoNumber === 1) setPhoto1(null);
      if (photoNumber === 2) setPhoto2(null);
      if (photoNumber === 3) setPhoto3(null);
      setSuccess("Photo deleted successfully!");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete photo!");
    }
  };
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axiosInstance.post("/api/profiles", {
        fullName,
        age: parseInt(age),
        gender,
        bio,
        location,
        occupation,
        education,
        height,
        religion,
        drinkingHabit,
        smokingHabit,
        interestedIn,
        relationshipGoal,
        minAgePreference: minAgePreference ? parseInt(minAgePreference) : null,
        maxAgePreference: maxAgePreference ? parseInt(maxAgePreference) : null,
      });

      if (response.data.success) {
        setSuccess("Profile saved successfully!");
      } else {
        setError(response.data.message);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const selectClass =
    "w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white";

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h2>

      <form onSubmit={handleSave} className="space-y-6">
        {success && (
          <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm">
            {success}
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Photos */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📸 My Photos</h3>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((photoNumber) => {
              const photoUrl =
                photoNumber === 1
                  ? photo1
                  : photoNumber === 2
                    ? photo2
                    : photo3;

              return (
                <div key={photoNumber} className="relative">
                  {/* Photo preview */}
                  <div className="h-32 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt={`Photo ${photoNumber}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-4xl">📷</span>
                    )}

                    {uploadingPhoto === photoNumber && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
                        <p className="text-white text-sm">Uploading...</p>
                      </div>
                    )}
                  </div>

                  {/* Upload/Delete buttons */}
                  <div className="flex gap-2 mt-2">
                    <label className="flex-1 bg-pink-500 hover:bg-pink-600 text-white text-xs py-1 rounded-lg text-center cursor-pointer transition">
                      {photoUrl ? "Change" : "Upload"}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handlePhotoUpload(photoNumber, file);
                        }}
                      />
                    </label>
                    {photoUrl && (
                      <button
                        type="button"
                        onClick={() => handlePhotoDelete(photoNumber)}
                        className="bg-red-100 hover:bg-red-200 text-red-500 text-xs py-1 px-2 rounded-lg transition"
                      >
                        🗑️
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-gray-400 text-center mt-1">
                    Photo {photoNumber}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        {/* Basic Info */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            👤 Basic Info
          </h3>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className={inputClass}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Your age"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Height</label>
                <input
                  type="text"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="e.g. 5'7 or 170cm"
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className={selectClass}
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Cebu City, Philippines"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
                rows={4}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Personal Info */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            💼 Personal Info
          </h3>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Occupation</label>
              <input
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                placeholder="e.g. Software Engineer"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Education</label>
              <select
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className={selectClass}
              >
                <option value="">Select education</option>
                <option value="High School">High School</option>
                <option value="Vocational">Vocational</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="Doctorate">Doctorate</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Religion</label>
              <select
                value={religion}
                onChange={(e) => setReligion(e.target.value)}
                className={selectClass}
              >
                <option value="">Select religion</option>
                <option value="Catholic">Catholic</option>
                <option value="Protestant">Protestant</option>
                <option value="Baptist">Baptist</option>
                <option value="Pentecostal">Pentecostal</option>
                <option value="Orthodox">Orthodox</option>
                <option value="Muslim">Muslim</option>
                <option value="Buddhist">Buddhist</option>
                <option value="Hindu">Hindu</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Drinking</label>
                <select
                  value={drinkingHabit}
                  onChange={(e) => setDrinkingHabit(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select</option>
                  <option value="Never">Never</option>
                  <option value="Socially">Socially</option>
                  <option value="Regularly">Regularly</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Smoking</label>
                <select
                  value={smokingHabit}
                  onChange={(e) => setSmokingHabit(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select</option>
                  <option value="Never">Never</option>
                  <option value="Socially">Socially</option>
                  <option value="Regularly">Regularly</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Looking For */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            💕 Looking For
          </h3>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Interested In</label>
              <select
                value={interestedIn}
                onChange={(e) => setInterestedIn(e.target.value)}
                className={selectClass}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Both">Both</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Relationship Goal</label>
              <select
                value={relationshipGoal}
                onChange={(e) => setRelationshipGoal(e.target.value)}
                className={selectClass}
              >
                <option value="">Select</option>
                <option value="Casual">Casual</option>
                <option value="Serious">Serious Relationship</option>
                <option value="Friendship">Friendship</option>
                <option value="Marriage">Marriage</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Min Age Preference</label>
                <input
                  type="number"
                  value={minAgePreference}
                  onChange={(e) => setMinAgePreference(e.target.value)}
                  placeholder="e.g. 18"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Max Age Preference</label>
                <input
                  type="number"
                  value={maxAgePreference}
                  onChange={(e) => setMaxAgePreference(e.target.value)}
                  placeholder="e.g. 35"
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-xl transition duration-200 disabled:opacity-50 text-lg"
        >
          {loading ? "Saving..." : "Save Profile 💕"}
        </button>
      </form>
    </div>
  );
}

export default ProfilePage;
