import { useState, useEffect } from 'react';
import NavHeader from '../components/NavHeader';
import { authAPI } from '../services/api';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nameForm, setNameForm] = useState({ name: '', editing: false, saving: false, error: '', success: '' });
  const [pwForm, setPwForm] = useState({
    currentPassword: '', newPassword: '', saving: false, error: '', success: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authAPI.getProfile();
        setProfile(data.user);
        setNameForm(f => ({ ...f, name: data.user.name }));
      } catch (err) {
        console.error('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleNameSave = async (e) => {
    e.preventDefault();
    setNameForm(f => ({ ...f, saving: true, error: '', success: '' }));
    try {
      const data = await authAPI.updateProfile({ name: nameForm.name });
      setProfile(data.user);
      setNameForm(f => ({ ...f, editing: false, saving: false, success: 'Name updated!' }));
    } catch (err) {
      setNameForm(f => ({
        ...f, saving: false,
        error: err.response?.data?.error || 'Failed to update name',
      }));
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPwForm(f => ({ ...f, saving: true, error: '', success: '' }));
    try {
      await authAPI.changePassword({
        currentPassword: pwForm.currentPassword,
        newPassword: pwForm.newPassword,
      });
      setPwForm({ currentPassword: '', newPassword: '', saving: false, error: '', success: 'Password changed!' });
    } catch (err) {
      setPwForm(f => ({
        ...f, saving: false,
        error: err.response?.data?.error || 'Failed to change password',
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
            <div className="flex justify-between">
              <span className="font-semibold">Member since</span>
              <span>{profile?.created_at && new Date(profile.created_at).toLocaleDateString()}</span>
            </div>
          </div>
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
              type="text" required minLength={2} maxLength={100}
              value={nameForm.name}
              onChange={e => setNameForm(f => ({ ...f, name: e.target.value }))}
              className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purdue-gold focus:outline-none"
            />
            <button
              type="submit" disabled={nameForm.saving}
              className="bg-purdue-gold text-black px-6 py-2 rounded-lg font-bold hover:bg-purdue-gold-dark disabled:opacity-50 transition-colors"
            >
              {nameForm.saving ? 'Saving...' : 'Save'}
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
              <input
                type="password" required
                value={pwForm.currentPassword}
                onChange={e => setPwForm(f => ({ ...f, currentPassword: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purdue-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
              <input
                type="password" required minLength={6}
                value={pwForm.newPassword}
                onChange={e => setPwForm(f => ({ ...f, newPassword: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purdue-gold focus:outline-none"
              />
              <p className="text-sm text-gray-500 mt-1">At least 6 characters</p>
            </div>
            <button
              type="submit" disabled={pwForm.saving}
              className="w-full bg-purdue-gold text-black py-3 rounded-lg font-bold hover:bg-purdue-gold-dark disabled:opacity-50 transition-colors"
            >
              {pwForm.saving ? 'Changing...' : 'Change Password'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;