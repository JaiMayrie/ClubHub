import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import NavHeader from "../components/NavHeader";
import { clubsAPI, membershipsAPI, joinRequestsAPI } from "../services/api";
import AIRecommendations from "../components/AIRecommendations";

function DashboardPage() {
  const { user } = useAuth();
  const [myClubs, setMyClubs] = useState([]);
  const [myMemberships, setMyMemberships] = useState([]);
  const [joinRequests, setJoinRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.role === "admin";

  const handleLeaveClub = useCallback((clubId) => {
    setMyMemberships((prev) => prev.filter((m) => m.club_id !== clubId));
  }, []);

  const fetchDashboardData = useCallback(async () => {
    try {
      if (isAdmin) {
        // Fetch clubs admin manages
        const clubsData = await clubsAPI.getMyClubs();
        setMyClubs(clubsData.clubs);
      } else {
        // Fetch student's memberships and join requests
        const [membershipsData, requestsData] = await Promise.all([
          membershipsAPI.getMy(),
          joinRequestsAPI.getMy(),
        ]);
        setMyMemberships(membershipsData.memberships);
        setJoinRequests(
          requestsData.requests.filter((r) => r.status === "pending"),
        );
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            {isAdmin ? "Admin Dashboard" : "My Dashboard"}
          </h1>
          <p className="text-xl text-gray-600">Welcome back, {user?.name}!</p>
        </div>

        {isAdmin ? (
          // ADMIN VIEW
          <>
            <div className="mb-8">
              <Link
                to="/clubs/create"
                className="inline-block bg-purdue-gold text-black px-6 py-3 rounded-lg font-bold hover:bg-purdue-gold-dark transition-colors"
              >
                + Create New Club
              </Link>
            </div>

            <section>
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-600 uppercase mb-6">
                  MY CLUBS ({myClubs.length})
                </h2>

                {myClubs.length === 0 ? (
                  <p className="text-gray-600">
                    You haven't created any clubs yet.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {myClubs.map((club) => (
                      <AdminClubCard key={club.id} club={club} />
                    ))}
                  </div>
                )}
              </div>
            </section>
          </>
        ) : (
          // STUDENT VIEW
          <>
            {/* Memberships */}
            <section className="mb-8">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <AIRecommendations user={user} compact={false} />
              </div>
            </section>
            <section className="mb-12">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-600 uppercase mb-6">
                  MY CLUBS ({myMemberships.length})
                </h2>

                {myMemberships.length === 0 ? (
                  <p className="text-gray-600">
                    You haven't joined any clubs yet.{" "}
                    <Link
                      to="/clubs"
                      className="text-purdue-gold hover:underline"
                    >
                      Browse clubs
                    </Link>
                  </p>
                ) : (
                  <div className="space-y-4">
                    {myMemberships.map((membership) => (
                      <StudentClubCard
                        key={membership.id}
                        membership={membership}
                        onLeave={handleLeaveClub}
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Pending Requests */}
            <section>
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-600 uppercase mb-6">
                  PENDING REQUESTS ({joinRequests.length})
                </h2>

                {joinRequests.length === 0 ? (
                  <p className="text-gray-600">No pending join requests.</p>
                ) : (
                  <div className="space-y-4">
                    {joinRequests.map((request) => (
                      <PendingRequestCard key={request.id} request={request} />
                    ))}
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

function RequestCard({ request, onAction }) {
  const [processing, setProcessing] = useState(false);

  const handleAction = async (status) => {
    setProcessing(true);
    try {
      await onAction(request.id, status);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-start gap-4">
        <div className="min-w-0">
          <p className="font-semibold truncate">{request.user_name}</p>
          <p className="text-sm text-gray-600 truncate">{request.user_email}</p>
          {request.message && (
            <p className="text-sm text-gray-700 mt-2 italic">
              "{request.message}"
            </p>
          )}
          <p className="text-xs text-gray-400 mt-1">
            {new Date(request.created_at).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => handleAction("approved")}
            disabled={processing}
            className="bg-green-500 text-white px-3 py-1.5 rounded text-sm font-semibold hover:bg-green-600 disabled:opacity-50 transition-colors"
          >
            Approve
          </button>
          <button
            onClick={() => handleAction("rejected")}
            disabled={processing}
            className="bg-red-500 text-white px-3 py-1.5 rounded text-sm font-semibold hover:bg-red-600 disabled:opacity-50 transition-colors"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

// Admin Club Card Component
function AdminClubCard({ club }) {
  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [memberCount, setMemberCount] = useState(club.member_count);

  const fetchRequests = useCallback(async () => {
    setLoadingRequests(true);
    try {
      const data = await joinRequestsAPI.getForClub(club.id);
      setRequests(data.requests);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoadingRequests(false);
    }
  }, [club.id]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleRequestAction = async (requestId, status) => {
    try {
      await joinRequestsAPI.updateStatus(requestId, status);
      setRequests((prev) => prev.filter((r) => r.id !== requestId));
      if (status === "approved") {
        setMemberCount((prev) => Number(prev) + 1);
      }
    } catch (error) {
      console.error("Error updating request:", error);
      alert("Failed to update request. Please try again.");
    }
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold">{club.name}</h3>
          <p className="text-gray-600 mt-1">{memberCount} members</p>
        </div>
        {requests.length > 0 && (
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
            {requests.length} pending
          </span>
        )}
      </div>

      <div className="flex gap-3 mb-6">
        <Link
          to={`/clubs/${club.id}`}
          className="bg-purdue-gold text-black px-4 py-2 rounded font-semibold hover:bg-purdue-gold-dark transition-colors"
        >
          View Club
        </Link>
        <Link
          to={`/clubs/${club.id}/edit`}
          className="bg-gray-200 text-black px-4 py-2 rounded font-semibold hover:bg-gray-300 transition-colors"
        >
          Edit Club
        </Link>
        <Link
          to={`/clubs/${club.id}/members`}
          className="bg-gray-200 text-black px-4 py-2 rounded font-semibold hover:bg-gray-300 transition-colors"
        >
          Members
        </Link>
      </div>

      <div className="border-t-2 border-gray-100 pt-4">
        <h4 className="font-bold text-gray-700 uppercase text-sm mb-3">
          Pending Join Requests
        </h4>

        {loadingRequests && (
          <p className="text-gray-500 text-sm">Loading requests...</p>
        )}

        {!loadingRequests && requests.length === 0 && (
          <p className="text-gray-500 text-sm">No pending requests.</p>
        )}

        <div className="space-y-3">
          {requests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onAction={handleRequestAction}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Student Club Card Component
function StudentClubCard({ membership, onLeave }) {
  const [leaving, setLeaving] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLeave = async () => {
    setLeaving(true);
    try {
      await membershipsAPI.leave(membership.club_id);
      onLeave(membership.club_id);
    } catch (err) {
      alert("Failed to leave club. Please try again.");
    } finally {
      setLeaving(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold mb-1">{membership.club_name}</h3>
          <span className="bg-purdue-gold text-black px-2 py-0.5 rounded text-sm font-semibold">
            {membership.category}
          </span>
          <p className="text-gray-600 text-sm mt-2">
            Member since {new Date(membership.joined_at).toLocaleDateString()}
          </p>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <Link
            to={`/clubs/${membership.club_id}`}
            className="bg-purdue-gold text-black px-4 py-2 rounded font-semibold hover:bg-purdue-gold-dark transition-colors text-sm"
          >
            View Club
          </Link>
          {!showConfirm ? (
            <button
              onClick={() => setShowConfirm(true)}
              className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
            >
              Leave club
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleLeave}
                disabled={leaving}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-red-600 disabled:opacity-50"
              >
                {leaving ? "Leaving..." : "Confirm"}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-200 text-black px-3 py-1 rounded text-sm font-semibold hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Pending Request Card Component
function PendingRequestCard({ request }) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-5 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-bold">{request.club_name}</h3>
        <p className="text-sm text-gray-500 mt-1">
          {request.club_category} • Requested{" "}
          {new Date(request.created_at).toLocaleDateString()}
        </p>
      </div>
      <span className="bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-full text-sm font-semibold flex-shrink-0">
        Pending
      </span>
    </div>
  );
}

export default DashboardPage;
