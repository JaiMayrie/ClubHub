import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import UserAvatar from "./UserAvatar";

function NavHeader({ backTo, backLabel = "← Back to Home" }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="relative bg-purdue-black py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          aria-label="ClubHub home"
          className="bg-purdue-gold text-black px-6 py-2 rounded font-bold text-lg"
        >
          ClubHub
        </Link>

        {backTo ? (
          <Link
            to={backTo}
            className="text-white hover:text-purdue-gold transition-colors"
          >
            {backLabel}
          </Link>
        ) : (
          <>
            {/* Mobile hamburger */}
            <button
              className="md:hidden text-white text-2xl"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>

            {/* Desktop nav */}
            <nav className="hidden md:flex gap-6 items-center">
              <Link
                to="/clubs"
                className="text-white hover:text-purdue-gold transition-colors font-medium"
              >
                Clubs
              </Link>

              {/* ✅ EVENTS LINK (DESKTOP) */}
              <Link
                to="/events"
                className="text-white hover:text-purdue-gold transition-colors font-medium"
              >
                Events
              </Link>

              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-white hover:text-purdue-gold transition-colors font-medium"
                  >
                    My Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="text-white hover:text-purdue-gold transition-colors font-medium"
                  >
                    Profile
                  </Link>
                  <Link to="/profile" aria-label="Your profile">
                    <UserAvatar
                      name={user.name}
                      avatarUrl={user.avatar_url}
                      size="sm"
                    />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-purdue-gold text-black px-4 py-2 rounded font-semibold hover:bg-purdue-gold-dark transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-purdue-gold text-black px-4 py-2 rounded font-semibold hover:bg-purdue-gold-dark transition-colors"
                >
                  Login
                </Link>
              )}
            </nav>
          </>
        )}
      </div>

      {/* Mobile dropdown */}
      {menuOpen && !backTo && (
        <div className="absolute top-full left-0 right-0 bg-purdue-black py-4 px-6 flex flex-col gap-4 md:hidden z-50">
          <Link
            to="/clubs"
            className="text-white hover:text-purdue-gold font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Clubs
          </Link>

          {/* ✅ EVENTS LINK (MOBILE) */}
          <Link
            to="/events"
            className="text-white hover:text-purdue-gold font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Events
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-white hover:text-purdue-gold font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="text-white hover:text-purdue-gold font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-left bg-purdue-gold text-black px-4 py-2 rounded font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-purdue-gold text-black px-4 py-2 rounded font-semibold inline-block"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export default NavHeader;