import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { clubsAPI } from '../services/api';

function CreateClubPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    meeting_info: '',
    contact_email: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = [
    'Academic',
    'Sports',
    'Arts',
    'Service',
    'Professional',
    'Special Interest'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await clubsAPI.create(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create club');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-purdue-black py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="bg-purdue-gold text-black px-6 py-2 rounded font-bold text-lg">
            ClubHub
          </Link>
          <Link to="/dashboard" className="text-white hover:text-purdue-gold transition-colors">
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white border-2 border-gray-200 rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Create New Club</h1>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Club Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Club Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                minLength={3}
                maxLength={150}
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Purdue Hackers"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purdue-gold focus:outline-none"
              />
              <p className="text-sm text-gray-500 mt-1">3-150 characters</p>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purdue-gold focus:outline-none"
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell students about your club..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purdue-gold focus:outline-none"
              />
            </div>

            {/* Meeting Info */}
            <div>
              <label htmlFor="meeting_info" className="block text-sm font-semibold text-gray-700 mb-2">
                Meeting Information (Optional)
              </label>
              <input
                id="meeting_info"
                name="meeting_info"
                type="text"
                value={formData.meeting_info}
                onChange={handleChange}
                placeholder="e.g., Wednesdays 6PM in Neff Hall"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purdue-gold focus:outline-none"
              />
            </div>

            {/* Contact Email */}
            <div>
              <label htmlFor="contact_email" className="block text-sm font-semibold text-gray-700 mb-2">
                Contact Email (Optional)
              </label>
              <input
                id="contact_email"
                name="contact_email"
                type="email"
                value={formData.contact_email}
                onChange={handleChange}
                placeholder="club@purdue.edu"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purdue-gold focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-purdue-gold text-black py-3 rounded-lg font-bold hover:bg-purdue-gold-dark transition-colors disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Club'}
              </button>
              <Link
                to="/dashboard"
                className="flex-1 bg-gray-200 text-black py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default CreateClubPage;
