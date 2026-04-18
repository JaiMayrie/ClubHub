import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import NavHeader from "../components/NavHeader";
import { clubsAPI } from "../services/api";

const sampleEvents = [
  {
    id: 1,
    title: "Spring Club Fair",
    date: "2026-04-20",
    location: "Walb Union",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
  },
    { 
      id: 2,
      title: "Coding Night",
      date: "2026-05-10",
      location: "Computer Science Building",
      image: "https://images.unsplash.com/photo-1555066931-4365d14b8c16?auto=format&fit=crop&w=800&q=80"
    }
  ];

function HomePage() {
  const { user } = useAuth();
  const [featuredClubs, setFeaturedClubs] = useState([]);

  useEffect(() => {
    clubsAPI
      .getAll()
      .then((data) => {
        setFeaturedClubs(data.clubs.slice(0, 2));
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader />

      <main className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-16 text-center shadow-xl">
          <h1 className="text-5xl font-bold mb-6">Welcome to ClubHub</h1>
          <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
            Discover and join student organizations at Purdue Fort Wayne
          </p>

          <div className="flex gap-4 justify-center">
            {user ? (
              <Link
                to="/clubs"
                className="bg-purdue-gold text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-purdue-gold-dark transition-colors"
              >
                Browse Clubs
              </Link>
            ) : (
              <>
                <Link
                  to="/clubs"
                  className="bg-purdue-gold text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-purdue-gold-dark transition-colors"
                >
                  Browse Clubs
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-purdue-black px-8 py-4 rounded-lg font-bold text-lg border-2 border-purdue-black hover:bg-gray-50 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Featured Clubs Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Featured Clubs</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredClubs.length > 0
              ? featuredClubs.map((club) => (
                  <Link
                    key={club.id}
                    to={`/clubs/${club.id}`}
                    className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow block"
                  >
                    <h3 className="text-xl font-bold mb-2">{club.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-purdue-gold text-black px-3 py-1 rounded text-sm font-semibold">
                        {club.category}
                      </span>
                      <span className="text-gray-600">
                        • {club.member_count} members
                      </span>
                    </div>
                    <p className="text-gray-700 line-clamp-2">
                      {club.description}
                    </p>
                  </Link>
                ))
              : [1, 2].map((i) => (
                  <div
                    key={i}
                    className="bg-white border-2 border-gray-200 rounded-lg p-6 animate-pulse"
                  >
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-4/5" />
                  </div>
                ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/clubs"
              className="text-purdue-gold hover:text-purdue-gold-dark font-semibold text-lg"
            >
              View all clubs →
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-purdue-black text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 ClubHub - Purdue University Fort Wayne
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;