import { useState, useEffect, useRef } from "react";
import NavHeader from "../components/NavHeader";
import { authAPI } from "../services/api";
import UserAvatar from "../components/UserAvatar";

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nameForm, setNameForm] = useState({
    name: "",
    editing: false,
    saving: false,
    error: "",
    success: "",
  });
  const [detailsForm, setDetailsForm] = useState({
    bio: "",
    major: "",
    year: "",
    saving: false,
    error: "",
    success: "",
  });
  const [pwForm, setPwForm] = useState({
    currentPassword: "",
    newPassword: "",
    saving: false,
    error: "",
    success: "",
  });
  const [avatarForm, setAvatarForm] = useState({
    file: null,
    preview: null,
    saving: false,
    error: "",
    success: "",
  });
  const avatarInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authAPI.getProfile();
        setProfile(data.user);
        setNameForm((f) => ({ ...f, name: data.user.name }));
        setDetailsForm((f) => ({
          ...f,
          bio: data.user.bio || "",
          major: data.user.major || "",
          year: data.user.year || "",
        }));
      } catch (err) {
        console.error("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleNameSave = async (e) => {
    e.preventDefault();
    setNameForm((f) => ({ ...f, saving: true, error: "", success: "" }));
    try {
      const data = await authAPI.updateProfile({ name: nameForm.name });
      setProfile(data.user);
      setNameForm((f) => ({
        ...f,
        editing: false,
        saving: false,
        success: "Name updated!",
      }));
    } catch (err) {
      setNameForm((f) => ({
        ...f,
        saving: false,
        error: err.response?.data?.error || "Failed to update name",
      }));
    }
  };

  const handleDetailsSave = async (e) => {
    e.preventDefault();
    setDetailsForm((f) => ({ ...f, saving: true, error: "", success: "" }));
    try {
      const data = await authAPI.updateProfile({
        bio: detailsForm.bio,
        major: detailsForm.major,
        year: detailsForm.year,
      });
      setProfile(data.user);
      setDetailsForm((f) => ({
        ...f,
        saving: false,
        success: "Profile updated!",
      }));
    } catch (err) {
      setDetailsForm((f) => ({
        ...f,
        saving: false,
        error: err.response?.data?.error || "Failed to update profile",
      }));
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPwForm((f) => ({ ...f, saving: true, error: "", success: "" }));
    try {
      await authAPI.changePassword({
        currentPassword: pwForm.currentPassword,
        newPassword: pwForm.newPassword,
      });
      setPwForm({
        currentPassword: "",
        newPassword: "",
        saving: false,
        error: "",
        success: "Password changed!",
      });
    } catch (err) {
      setPwForm((f) => ({
        ...f,
        saving: false,
        error: err.response?.data?.error || "Failed to change password",
      }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarForm((f) => ({
      ...f,
      file,
      preview: URL.createObjectURL(file),
      error: "",
      success: "",
    }));
  };

  const handleAvatarUpload = async (e) => {
    e.preventDefault();
    if (!avatarForm.file) return;
    setAvatarForm((f) => ({ ...f, saving: true, error: "", success: "" }));
    try {
      const data = await authAPI.uploadAvatar(avatarForm.file);
      setProfile(data.user);
      setAvatarForm((f) => ({
        ...f,
        saving: false,
        success: "Photo updated!",
        file: null,
        preview: null,
      }));
      if (avatarInputRef.current) avatarInputRef.current.value = "";
    } catch (err) {
      setAvatarForm((f) => ({
        ...f,
        saving: false,
        error: err.response?.data?.error || "Failed to upload photo",
      }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader />
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        {/* Profile Info */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Account Information</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex justify-between">
              <span className="font-semibold">Name</span>
              <span>{profile?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Email</span>
              <span>{profile?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Role</span>
              <span className="capitalize">{profile?.role}</span>
            </div>
            {profile?.major && (
              <div className="flex justify-between">
                <span className="font-semibold">Major</span>
                <span>{profile.major}</span>
              </div>
            )}
            {profile?.year && (
              <div className="flex justify-between">
                <span className="font-semibold">Year</span>
                <span>{profile.year}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="font-semibold">Member since</span>
              <span>
                {profile?.created_at &&
                  new Date(profile.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
          {profile?.bio && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm font-semibold text-gray-700 mb-1">Bio</p>
              <p className="text-sm text-gray-600">{profile.bio}</p>
            </div>
          )}
        </div>

        {/* Profile Photo */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Profile Photo</h2>
          {avatarForm.success && (
            <div className="bg-green-50 border-2 border-green-200 text-green-800 px-4 py-3 rounded mb-4">
              {avatarForm.success}
            </div>
          )}
          {avatarForm.error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded mb-4">
              {avatarForm.error}
            </div>
          )}
          <form onSubmit={handleAvatarUpload} className="space-y-4">
            <div className="flex items-center gap-4">
              <UserAvatar
                name={profile?.name}
                avatarUrl={avatarForm.preview || profile?.avatar_url}
                size="lg"
              />
              <div className="flex-1">
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleAvatarChange}
                  className="block w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purdue-gold file:text-black hover:file:bg-purdue-gold-dark file:cursor-pointer"
                />
                <p className="text-xs text-gray-400 mt-1">
                  JPEG, PNG, WebP, or GIF · Max 2 MB
                </p>
              </div>
            </div>
            <button
              type="submit"
              disabled={avatarForm.saving || !avatarForm.file}
              className="bg-purdue-gold text-black px-6 py-2 rounded-lg font-bold hover:bg-purdue-gold-dark disabled:opacity-50 transition-colors"
            >
              {avatarForm.saving ? "Uploading..." : "Upload Photo"}
            </button>
          </form>
        </div>

        {/* Edit Name */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Edit Name</h2>
          {nameForm.success && (
            <div className="bg-green-50 border-2 border-green-200 text-green-800 px-4 py-3 rounded mb-4">
              {nameForm.success}
            </div>
          )}
          {nameForm.error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded mb-4">
              {nameForm.error}
            </div>
          )}
          <form onSubmit={handleNameSave} className="flex gap-3">
            <input
              type="text"
              required
              minLength={2}
              maxLength={100}
              value={nameForm.name}
              onChange={(e) =>
                setNameForm((f) => ({ ...f, name: e.target.value }))
              }
              className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purdue-gold focus:outline-none"
            />
            <button
              type="submit"
              disabled={nameForm.saving}
              className="bg-purdue-gold text-black px-6 py-2 rounded-lg font-bold hover:bg-purdue-gold-dark disabled:opacity-50 transition-colors"
            >
              {nameForm.saving ? "Saving..." : "Save"}
            </button>
          </form>
        </div>

        {/* Edit Profile Details */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Profile Details</h2>
          {detailsForm.success && (
            <div className="bg-green-50 border-2 border-green-200 text-green-800 px-4 py-3 rounded mb-4">
              {detailsForm.success}
            </div>
          )}
          {detailsForm.error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded mb-4">
              {detailsForm.error}
            </div>
          )}
          <form onSubmit={handleDetailsSave} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Major
              </label>
              <input
                type="text"
                maxLength={100}
                placeholder="e.g. Computer Science"
                value={detailsForm.major}
                onChange={(e) =>
                  setDetailsForm((f) => ({ ...f, major: e.target.value }))
                }
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purdue-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Year
              </label>
              <select
                value={detailsForm.year}
                onChange={(e) =>
                  setDetailsForm((f) => ({ ...f, year: e.target.value }))
                }
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purdue-gold focus:outline-none bg-white"
              >
                <option value="">— Select year —</option>
                <option value="Freshman">Freshman</option>
                <option value="Sophomore">Sophomore</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
                <option value="Graduate">Graduate</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                maxLength={500}
                rows={4}
                placeholder="Tell other members a bit about yourself..."
                value={detailsForm.bio}
                onChange={(e) =>
                  setDetailsForm((f) => ({ ...f, bio: e.target.value }))
                }
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purdue-gold focus:outline-none resize-none"
              />
              <p className="text-xs text-gray-400 text-right mt-1">
                {detailsForm.bio.length}/500
              </p>
            </div>
            <button
              type="submit"
              disabled={detailsForm.saving}
              className="bg-purdue-gold text-black px-6 py-2 rounded-lg font-bold hover:bg-purdue-gold-dark disabled:opacity-50 transition-colors"
            >
              {detailsForm.saving ? "Saving..." : "Save Details"}
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Change Password</h2>
          {pwForm.success && (
            <div className="bg-green-50 border-2 border-green-200 text-green-800 px-4 py-3 rounded mb-4">
              {pwForm.success}
            </div>
          )}
          {pwForm.error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded mb-4">
              {pwForm.error}
            </div>
          )}
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                required
                value={pwForm.currentPassword}
                onChange={(e) =>
                  setPwForm((f) => ({ ...f, currentPassword: e.target.value }))
                }
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purdue-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={pwForm.newPassword}
                onChange={(e) =>
                  setPwForm((f) => ({ ...f, newPassword: e.target.value }))
                }
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purdue-gold focus:outline-none"
              />
              <p className="text-sm text-gray-500 mt-1">
                At least 6 characters
              </p>
            </div>
            <button
              type="submit"
              disabled={pwForm.saving}
              className="w-full bg-purdue-gold text-black py-3 rounded-lg font-bold hover:bg-purdue-gold-dark disabled:opacity-50 transition-colors"
            >
              {pwForm.saving ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
