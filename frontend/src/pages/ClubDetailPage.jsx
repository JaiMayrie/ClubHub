import { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import NavHeader from "../components/NavHeader";
import {
  clubsAPI,
  joinRequestsAPI,
  membershipsAPI,
  eventsAPI,
} from "../services/api";
import { getClubVisual } from "../data/clubVisuals";

function ClubDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const clubVisual = getClubVisual({ category: "default" });

  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joinMessage, setJoinMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userStatus, setUserStatus] = useState(null);
  const [events, setEvents] = useState([]);

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

  useEffect(() => {
    const checkUserStatus = async () => {
      if (!user) return;
      try {
        const [memberships, requests] = await Promise.all([
          membershipsAPI.getMy(),
          joinRequestsAPI.getMy(),
        ]);

        const isMember = memberships.memberships.some(
          (m) => m.club_id === parseInt(id),
        );

        const hasPending = requests.requests.some(
          (r) => r.club_id === parseInt(id) && r.status === "pending",
        );

        if (isMember) {
          setUserStatus("member");
        } else if (hasPending) {
          setUserStatus("pending");
        }
      } catch (err) {
        console.error("Error checking user status:", err);
      }
    };

    const fetchEvents = async () => {
      try {
        const data = await eventsAPI.getForClub(id);
        setEvents(data.events || []);
      } catch (err) {
        console.error("Error fetching club events:", err);
      }
    };

    fetchEvents();
    checkUserStatus();
  }, [id, user]);

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
      setUserStatus("pending");
      setJoinMessage("");
      setSuccess("Join request submitted successfully.");
    } catch (err) {
      const msg = err.response?.data?.error || "Failed to submit join request";

      if (msg.includes("already a member")) {
        setUserStatus("member");
      } else if (msg.includes("already have a pending")) {
        setUserStatus("pending");
      } else {
        setError(msg);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="overflow-hidden bg-white border-2 border-gray-200 rounded-2xl">
            <div className="relative h-72">
              <img
                src={clubVisual.image}
                alt="Club banner placeholder"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${clubVisual.accent} opacity-75`}
                aria-hidden="true"
              />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="inline-block bg-white/20 backdrop-blur px-4 py-1 rounded-full text-sm font-semibold mb-3">
                  Loading
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-3">
                  Loading club...
                </h1>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Club not found</p>
          <button
            onClick={() => navigate(-1)}
            className="text-purdue-gold hover:underline"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  const isOwner = user && club.admin_id === user.id;
  const visual = getClubVisual(club);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-purdue-gold hover:underline"
          >
            ← Back
          </button>
        </div>

        <div className="overflow-hidden bg-white border-2 border-gray-200 rounded-2xl">
          <div className="relative h-72">
            <img
              src={visual.image}
              alt={`${club.name} banner`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t ${visual.accent} opacity-75`}
              aria-hidden="true"
            />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="inline-block bg-white/20 backdrop-blur px-4 py-1 rounded-full text-sm font-semibold mb-3">
                {club.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                {club.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
                <span>{club.member_count} members</span>
                {club.admin_name && <span>Admin: {club.admin_name}</span>}
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
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

            <div>
              <h2 className="text-xl font-bold mb-4">Recent Events</h2>

              {events.length === 0 ? (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-600">
                  No upcoming events posted yet.
                </div>
              ) : (
                <div className="grid gap-4">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="border border-gray-200 rounded-xl overflow-hidden bg-white"
                    >
                      {event.image_url && (
                        <img
                          src={event.image_url}
                          alt={event.title}
                          className="w-full h-44 object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      )}

                      <div className="p-5">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="bg-purdue-gold text-black px-3 py-1 rounded-full text-xs font-semibold">
                            Event
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(event.starts_at).toLocaleString()}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold mb-2">
                          {event.title}
                        </h3>
                        {event.description && (
                          <p className="text-gray-700 mb-3">
                            {event.description}
                          </p>
                        )}
                        {event.location && (
                          <p className="text-sm text-gray-600">
                            Location: {event.location}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {(isOwner || userStatus === "member") && (
              <div className="pt-2 border-t-2 border-gray-200">
                <Link
                  to={`/clubs/${id}/members`}
                  className="inline-block bg-purdue-gold text-black px-5 py-2 rounded-lg font-semibold hover:bg-purdue-gold-dark transition-colors"
                >
                  View Members
                </Link>
              </div>
            )}

            {user && (
              <div className="pt-8 border-t-2 border-gray-200">
                <h2 className="text-2xl font-bold mb-4">
                  {isOwner
                    ? "Your Club"
                    : userStatus === "member"
                      ? "You are a member"
                      : "Request to Join"}
                </h2>

                {(isOwner || userStatus === "member") && (
                  <div className="flex flex-col gap-3">
                    <div className="bg-blue-50 border-2 border-blue-200 text-blue-800 px-4 py-3 rounded">
                      {isOwner
                        ? "You are the administrator of this club."
                        : "You are a member of this club."}
                    </div>
                  </div>
                )}

                {!isOwner && userStatus === "pending" && (
                  <div className="bg-yellow-50 border-2 border-yellow-200 text-yellow-800 px-4 py-3 rounded">
                    Your join request is pending approval.
                  </div>
                )}

                {!isOwner && !userStatus && (
                  <>
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
                  </>
                )}
              </div>
            )}

            {!user && (
              <div className="pt-8 border-t-2 border-gray-200">
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
        </div>
      </main>
    </div>
  );
}

export default ClubDetailPage;
