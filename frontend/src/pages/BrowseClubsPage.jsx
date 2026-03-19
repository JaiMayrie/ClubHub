import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { clubsAPI } from '../services/api';

function BrowseClubsPage() {
  const { user } = useAuth();
  const [clubs, setClubs] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = [
    'All Categories',
    'Academic',
    'Sports',
    'Arts',
    'Service',
    'Professional',
    'Special Interest'
  ];

  const fetchClubs = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (category && category !== 'All Categories') params.category = category;
      
      const data = await clubsAPI.getAll(params);
      setClubs(data.clubs);
    } catch (error) {
      console.error('Error fetching clubs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, [search, category]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-purdue-black py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="bg-purdue-gold text-black px-6 py-2 rounded font-bold text-lg">
            ClubHub
          </Link>
          <nav className="flex gap-6">
            <Link
              to="/clubs"
              className="text-white hover:text-purdue-gold transition-colors font-medium"
            >
              Clubs
            </Link>
            {user ? (
              <Link
                to="/dashboard"
                className="text-white hover:text-purdue-gold transition-colors font-medium"
              >
                My Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-white hover:text-purdue-gold transition-colors font-medium"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">All Clubs</h1>

        {/* Search & Filter */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-8">
          <h3 className="text-sm font-semibold text-gray-600 uppercase mb-4">
            Search & Filter Bar
          </h3>
          
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search clubs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-purdue-gold focus:outline-none"
          />
          
          {/* Category Filter */}
          <select
            value={category || 'All Categories'}
            onChange={(e) => setCategory(e.target.value === 'All Categories' ? '' : e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purdue-gold focus:outline-none"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Club Grid */}
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-gray-600 uppercase">
            CLUB GRID ({clubs.length}+ CLUBS)
          </h2>
        </div>

        {loading ? (
          <p className="text-center py-12 text-gray-600">Loading clubs...</p>
        ) : clubs.length === 0 ? (
          <p className="text-center py-12 text-gray-600">
            No clubs found matching your criteria.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map(club => (
              <div
                key={club.id}
                className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold mb-2">{club.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-purdue-gold text-black px-3 py-1 rounded text-sm font-semibold">
                    {club.category}
                  </span>
                  <span className="text-gray-600">• {club.member_count} members</span>
                </div>
                <p className="text-gray-700 mb-4 line-clamp-2">
                  {club.description}
                </p>
                <Link
                  to={`/clubs/${club.id}`}
                  className="block w-full text-center bg-purdue-gold text-black py-2 rounded font-semibold hover:bg-purdue-gold-dark transition-colors"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default BrowseClubsPage;