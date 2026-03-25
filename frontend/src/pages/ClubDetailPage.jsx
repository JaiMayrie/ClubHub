import { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import NavHeader from "../components/NavHeader";
import { clubsAPI, joinRequestsAPI } from "../services/api";

function ClubDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joinMessage, setJoinMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchClubDetails = useCallback(async () => {
    try {
      const data = await clubsAPI.getById(id);
      setClub(data.club);
    } catch (error) {
      console.error("Error fetching club:", error);
      setError("Failed to load club details");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchClubDetails();
  }, [fetchClubDetails]);

  const handleJoinRequest = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      await joinRequestsAPI.submit(id, joinMessage);
      setSuccess("Join request submitted successfully!");
      setJoinMessage("");
    } catch (error) {
      setError(error.response?.data?.error || "Failed to submit join request");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading club details...</p>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Club not found</p>
          <Link to="/clubs" className="text-purdue-gold hover:underline">
            ← Back to clubs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/clubs" className="text-purdue-gold hover:underline">
            ← Back to all clubs
          </Link>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg p-8">
          {/* Club Header */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-3">{club.name}</h1>
            <div className="flex items-center gap-3">
              <span className="bg-purdue-gold text-black px-4 py-2 rounded font-semibold">
                {club.category}
              </span>
              <span className="text-gray-600">
                • {club.member_count} members
              </span>
            </div>
          </div>

          {/* Club Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">About</h2>
              <p className="text-gray-700">{club.description}</p>
            </div>

            {club.meeting_info && (
              <div>
                <h2 className="text-xl font-bold mb-2">Meeting Information</h2>
                <p className="text-gray-700">{club.meeting_info}</p>
              </div>
            )}

            {club.contact_email && (
              <div>
                <h2 className="text-xl font-bold mb-2">Contact</h2>
                <a
                  href={`mailto:${club.contact_email}`}
                  className="text-purdue-gold hover:underline"
                >
                  {club.contact_email}
                </a>
              </div>
            )}

            {club.admin_name && (
              <div>
                <h2 className="text-xl font-bold mb-2">Club Administrator</h2>
                <p className="text-gray-700">{club.admin_name}</p>
              </div>
            )}
          </div>

          {/* Join Request Form */}
          {user && (
            <div className="mt-8 pt-8 border-t-2 border-gray-200">
              <h2 className="text-2xl font-bold mb-4">Request to Join</h2>

              {error && (
                <div className="bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border-2 border-green-200 text-green-800 px-4 py-3 rounded mb-4">
                  {success}
                </div>
              )}

              <form onSubmit={handleJoinRequest} className="space-y-4">
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Message to Club Admin (Optional)
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Tell us why you'd like to join..."
                    value={joinMessage}
                    onChange={(e) => setJoinMessage(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purdue-gold focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-purdue-gold text-black px-8 py-3 rounded-lg font-bold hover:bg-purdue-gold-dark transition-colors disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit Join Request"}
                </button>
              </form>
            </div>
          )}

          {!user && (
            <div className="mt-8 pt-8 border-t-2 border-gray-200">
              <p className="text-gray-600">
                <Link
                  to="/login"
                  className="text-purdue-gold hover:underline font-semibold"
                >
                  Log in
                </Link>{" "}
                to request to join this club
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default ClubDetailPage;
