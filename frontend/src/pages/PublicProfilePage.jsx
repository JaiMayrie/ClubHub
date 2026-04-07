import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import NavHeader from "../components/NavHeader";
import { authAPI } from "../services/api";

function PublicProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await authAPI.getPublicProfile(id);
        setData(result);
      } catch (err) {
        if (err.response?.status === 404) {
          setError("User not found.");
        } else {
          setError("Failed to load profile.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavHeader />
        <main className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded">
            {error}
          </div>
        </main>
      </div>
    );
  }

  const { user, clubs } = data;
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader />
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header card */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-purdue-gold flex items-center justify-center text-2xl font-bold text-black flex-shrink-0">
              {initials}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-600">
                {user.major && <span>{user.major}</span>}
                {user.year && <span>{user.year}</span>}
                <span>
                  Joined {new Date(user.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          {user.bio && (
            <p className="mt-4 text-gray-700 text-sm leading-relaxed border-t border-gray-100 pt-4">
              {user.bio}
            </p>
          )}
        </div>

        {/* Clubs */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Clubs ({clubs.length})</h2>
          {clubs.length === 0 ? (
            <p className="text-gray-500 text-sm">
              Not a member of any clubs yet.
            </p>
          ) : (
            <div className="space-y-2">
              {clubs.map((club) => (
                <Link
                  key={club.id}
                  to={`/clubs/${club.id}`}
                  className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium">{club.club_name}</span>
                  <span className="bg-purdue-gold text-black px-2 py-0.5 rounded text-xs font-semibold">
                    {club.category}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default PublicProfilePage;
