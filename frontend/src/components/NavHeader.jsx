import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function NavHeader({ backTo, backLabel = "← Back to Home" }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Navigate a user back to home page on logout and clear auth state
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-purdue-black py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
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
          <nav className="flex gap-6 items-center">
            <Link
              to="/clubs"
              className="text-white hover:text-purdue-gold transition-colors font-medium"
            >
              Clubs
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-white hover:text-purdue-gold transition-colors font-medium"
                >
                  My Dashboard
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
        )}
      </div>
    </header>
  );
}

export default NavHeader;
