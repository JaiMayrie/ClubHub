import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import NavHeader from "../components/NavHeader";
import { clubsAPI, eventsAPI } from "../services/api";

function HomePage() {
  const { user } = useAuth();
  const [featuredClubs, setFeaturedClubs] = useState([]);
  const [featuredEvents, setFeaturedEvents] = useState([]);

  useEffect(() => {
    clubsAPI
      .getAll()
      .then((data) => {
        setFeaturedClubs((data.clubs || []).slice(0, 2));
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    eventsAPI
      .getRecent()
      .then((data) => setFeaturedEvents(data.events || []))
      .catch((error) => console.error("Error fetching featured events:", error));
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

        {/* Featured Events Section */}
        <section className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold">Featured Events</h2>
              <p className="text-gray-600">See what’s happening around campus.</p>
            </div>

            <Link
              to="/events"
              className="text-purdue-gold font-semibold hover:underline"
            >
              View all events
            </Link>
          </div>

          {featuredEvents.length === 0 ? (
            <p className="text-gray-600">No featured events yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredEvents.slice(0, 3).map((event) => (
                <article
                  key={event.id}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6"
                >
                  <p className="text-sm font-semibold text-purdue-gold mb-2">
                    {event.club_name || "Club Event"}
                  </p>

                  <h3 className="text-xl font-bold mb-2">{event.name}</h3>

                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {event.description}
                  </p>

                  <p className="text-sm text-gray-600">
                    {new Date(event.event_date).toLocaleDateString()}
                  </p>

                  {event.location && (
                    <p className="text-sm text-gray-600 mt-1">
                      {event.location}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="bg-purdue-black text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2026 ClubHub - Purdue University Fort Wayne 
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;