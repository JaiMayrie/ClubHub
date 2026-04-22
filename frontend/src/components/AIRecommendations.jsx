import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { recommendationsAPI } from "../services/api";

/**
 * AIRecommendations
 * Renders 3–5 AI-suggested club cards powered by Google Gemini (free).
 *
 * Props:
 *   user    — auth user object (used to check profile completeness)
 *   compact — true = sidebar style (BrowseClubsPage)
 *             false = full grid (DashboardPage)
 */
function AIRecommendations({ user, compact = false }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  // Need at least one profile field for useful suggestions
  const hasProfile = user?.major || user?.bio || user?.year;

  useEffect(() => {
    if (!hasProfile) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError("");

    recommendationsAPI
      .getSuggestions()
      .then((data) => {
        if (!cancelled) setRecommendations(data.recommendations || []);
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't load suggestions right now.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [refreshKey, hasProfile]);

  // ── No profile info: nudge ─────────────────────────────────────
  if (!hasProfile) {
    return (
      <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-5">
        <p className="text-lg font-bold text-amber-900 mb-1">
          ✨ Get AI Club Picks
        </p>
        <p className="text-sm text-amber-800 mb-3">
          Add your major, year, or a short bio and AI will suggest clubs
          tailored just for you.
        </p>
        <Link
          to="/profile"
          className="inline-block bg-amber-400 text-black text-sm font-bold px-4 py-2 rounded-lg hover:bg-amber-500 transition-colors"
        >
          Complete Your Profile →
        </Link>
      </div>
    );
  }

  // ── Loading skeletons ──────────────────────────────────────────
  if (loading) {
    return (
      <div>
        <SectionHeader compact={compact} onRefresh={null} />
        <div
          className={
            compact
              ? "space-y-3"
              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          }
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white border-2 border-gray-200 rounded-xl p-5 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
              <div className="h-5 bg-gray-200 rounded w-2/3 mb-3" />
              <div className="h-3 bg-gray-200 rounded w-full mb-1" />
              <div className="h-3 bg-gray-200 rounded w-4/5" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
        <p className="text-red-700 text-sm font-medium mb-2">{error}</p>
        <button
          onClick={() => setRefreshKey((k) => k + 1)}
          className="text-sm text-red-600 underline hover:text-red-800"
        >
          Try again
        </button>
      </div>
    );
  }

  // ── Empty ──────────────────────────────────────────────────────
  if (recommendations.length === 0) {
    return (
      <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 text-sm text-gray-500">
        No new suggestions — you may already be in all the best-fit clubs!
      </div>
    );
  }

  // ── Club cards ─────────────────────────────────────────────────
  return (
    <div>
      <SectionHeader
        compact={compact}
        onRefresh={() => setRefreshKey((k) => k + 1)}
      />
      <div
        className={
          compact
            ? "space-y-3"
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        }
      >
        {recommendations.map((rec, i) => (
          <ClubCard key={i} rec={rec} compact={compact} />
        ))}
      </div>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────

function SectionHeader({ compact, onRefresh }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <span className="text-xl">✨</span>
        <h2
          className={`font-bold text-gray-900 ${
            compact ? "text-base" : "text-xl"
          }`}
        >
          AI Picks For You
        </h2>
        <span className="bg-purdue-gold text-black text-xs font-bold px-2 py-0.5 rounded-full">
          AI
        </span>
      </div>
      {onRefresh && (
        <button
          onClick={onRefresh}
          className="text-sm text-gray-500 hover:text-gray-800 transition-colors font-medium"
          title="Get new suggestions"
        >
          ↻ Refresh
        </button>
      )}
    </div>
  );
}

function ClubCard({ rec, compact }) {
  // Compact sidebar card — BrowseClubsPage
  if (compact) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-4 hover:border-purdue-gold transition-colors">
        <span className="inline-block bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full mb-2">
          {rec.category}
        </span>
        <p className="font-bold text-gray-900 text-sm mb-1">{rec.club_name}</p>
        <p className="text-xs text-gray-600 leading-relaxed">{rec.reason}</p>
      </div>
    );
  }

  // Full card — DashboardPage
  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-purdue-gold hover:shadow-md transition-all">
      <span className="inline-block bg-purdue-gold text-black text-xs font-bold px-3 py-1 rounded-full mb-3">
        {rec.category}
      </span>
      <h3 className="font-bold text-gray-900 text-lg mb-2">{rec.club_name}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{rec.reason}</p>
    </div>
  );
}

export default AIRecommendations;
