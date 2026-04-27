import { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import NavHeader from "../components/NavHeader";
import { membersAPI } from "../services/api";

function ClubMembersPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMembers = useCallback(async () => {
    try {
      const result = await membersAPI.getClubMembers(id);
      setData(result);
    } catch (err) {
      if (err.response?.status === 403) {
        navigate("/dashboard");
      } else {
        setError("Failed to load members");
      }
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const handleRemove = async (userId, userName) => {
    if (!window.confirm(`Remove ${userName} from this club?`)) return;
    try {
      await membersAPI.removeMember(id, userId);
      setData((prev) => ({
        ...prev,
        members: prev.members.filter((m) => m.id !== userId),
        member_count: prev.member_count - 1,
      }));
    } catch (err) {
      alert(err.response?.data?.error || "Failed to remove member");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading members...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader backTo={`/clubs/${id}`} backLabel="← Back to Club" />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{data?.club_name}</h1>
          <p className="text-gray-600 mt-1">{data?.member_count} members</p>
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
          {data?.members?.length === 0 ? (
            <p className="text-gray-600 p-6">No members yet.</p>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">
                    Name
                  </th>
                  {data?.is_admin && (
                    <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">
                      Email
                    </th>
                  )}
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">
                    Joined
                  </th>
                  {data?.is_admin && <th className="px-6 py-3"></th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data?.members?.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">
                      <Link
                        to={`/profile/${member.id}`}
                        className="hover:text-purdue-gold transition-colors"
                      >
                        {member.name}
                      </Link>
                    </td>
                    {data?.is_admin && (
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {member.email}
                      </td>
                    )}
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {new Date(member.joined_at).toLocaleDateString()}
                    </td>
                    {data?.is_admin && (
                      <td className="px-6 py-4 text-right">
                        {member.id !== data.admin_id && (
                          <button
                            onClick={() => handleRemove(member.id, member.name)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

export default ClubMembersPage;
