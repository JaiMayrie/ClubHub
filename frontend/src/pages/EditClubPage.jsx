import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import NavHeader from '../components/NavHeader';
import { clubsAPI } from '../services/api';

function EditClubPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    meeting_info: '',
    contact_email: '',
  });

  const categories = [
    'Academic', 'Sports', 'Arts', 'Service', 'Professional', 'Special Interest',
  ];

  useEffect(() => {
    const fetchClub = async () => {
      try {
        const data = await clubsAPI.getById(id);
        const { name, category, description, meeting_info, contact_email } = data.club;
        setFormData({
          name: name || '',
          category: category || '',
          description: description || '',
          meeting_info: meeting_info || '',
          contact_email: contact_email || '',
        });
      } catch (err) {
        setError('Failed to load club details');
      } finally {
        setLoading(false);
      }
    };
    fetchClub();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await clubsAPI.update(id, formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update club');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader backTo="/dashboard" backLabel="← Back to Dashboard" />
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white border-2 border-gray-200 rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Edit Club</h1>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Club Name *
              </label>
              <input
                id="name" name="name" type="text" required
                minLength={3} maxLength={150}
                value={formData.name} onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purdue-gold focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category" name="category" required
                value={formData.category} onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purdue-gold focus:outline-none"
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description" name="description" required rows={4}
                value={formData.description} onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purdue-gold focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="meeting_info" className="block text-sm font-semibold text-gray-700 mb-2">
                Meeting Information (Optional)
              </label>
              <input
                id="meeting_info" name="meeting_info" type="text"
                value={formData.meeting_info} onChange={handleChange}
                placeholder="e.g., Wednesdays 6PM in Neff Hall"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purdue-gold focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="contact_email" className="block text-sm font-semibold text-gray-700 mb-2">
                Contact Email (Optional)
              </label>
              <input
                id="contact_email" name="contact_email" type="email"
                value={formData.contact_email} onChange={handleChange}
                placeholder="club@purdue.edu"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purdue-gold focus:outline-none"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit" disabled={saving}
                className="flex-1 bg-purdue-gold text-black py-3 rounded-lg font-bold hover:bg-purdue-gold-dark transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
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

export default EditClubPage;