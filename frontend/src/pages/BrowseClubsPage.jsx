import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import NavHeader from "../components/NavHeader";
import { clubsAPI } from "../services/api";
import { ClubCardSkeleton } from "../components/LoadingSkeleton";
import { getClubVisual } from "../data/clubVisuals";
import AIRecommendations from "../components/AIRecommendations";
import { useAuth } from "../hooks/useAuth";

function BrowseClubsPage() {
  const [clubs, setClubs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const categories = [
    "All Categories",
    "Academic",
    "Sports",
    "Arts",
    "Service",
    "Professional",
    "Special Interest",
  ];

  const fetchClubs = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (category && category !== "All Categories") params.category = category;

      const data = await clubsAPI.getAll(params);
      setClubs(data.clubs || []);
    } catch (error) {
      console.error("Error fetching clubs:", error);
      setClubs([]);
    } finally {
      setLoading(false);
    }
  }, [search, category]);

  useEffect(() => {
    fetchClubs();
  }, [fetchClubs]);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">All Clubs</h1>

        {/* Search & Filter */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-8">
          <h3 className="text-sm font-semibold text-gray-600 uppercase mb-4">
            Search & Filter
          </h3>

          <input
            type="text"
            placeholder="Search clubs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search clubs by name or description"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-purdue-gold focus:outline-none"
          />

          <select
            value={category || "All Categories"}
            onChange={(e) =>
              setCategory(
                e.target.value === "All Categories" ? "" : e.target.value,
              )
            }
            aria-label="Filter by category"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purdue-gold focus:outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Two-column layout: club grid + AI sidebar */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Left: club grid */}
          <div className="flex-1 min-w-0">
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-gray-600 uppercase">
                Club Grid ({clubs.length} clubs)
              </h2>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <ClubCardSkeleton key={i} />
                ))}
              </div>
            ) : clubs.length === 0 ? (
              <p className="text-center py-12 text-gray-600">
                No clubs found matching your criteria.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clubs.map((club) => {
                  const visual = getClubVisual(club);

                  return (
                    <div
                      key={club.id}
                      className="overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative h-44">
                        <img
                          src={visual.image}
                          alt={`${club.name} cover`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-t ${visual.accent} opacity-70`}
                          aria-hidden="true"
                        />
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <span className="inline-block bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold mb-2">
                            {club.category}
                          </span>
                          <h3 className="text-xl font-bold leading-tight">
                            {club.name}
                          </h3>
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                          <span>{club.member_count} members</span>
                          {club.admin_name && (
                            <span>Led by {club.admin_name}</span>
                          )}
                        </div>

                        <p className="text-gray-700 mb-4 line-clamp-3">
                          {club.description}
                        </p>

                        <Link
                          to={`/clubs/${club.id}`}
                          className="block w-full text-center bg-purdue-gold text-black py-2.5 rounded-lg font-semibold hover:bg-purdue-gold-dark transition-colors"
                        >
                          View Club
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right: AI sidebar — only for logged-in users */}
          {user && (
            <aside className="w-full lg:w-72 flex-shrink-0">
              <div className="sticky top-4 bg-white border-2 border-gray-200 rounded-lg p-5">
                <AIRecommendations user={user} compact={true} />
              </div>
            </aside>
          )}

        </div>
      </main>
    </div>
  );
}

export default BrowseClubsPage;