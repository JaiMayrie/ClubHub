import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

function DashboardPage() {
  const { user, logout } = useAuth();

  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-purdue-black py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="bg-purdue-gold text-black px-6 py-2 rounded font-bold text-lg">
            ClubHub
          </div>
          <nav className="flex gap-6 items-center">
            <Link
              to="/clubs"
              className="text-white hover:text-purdue-gold transition-colors font-medium"
            >
              Clubs
            </Link>
            <Link
              to="/dashboard"
              className="text-white hover:text-purdue-gold transition-colors font-medium"
            >
              My Dashboard
            </Link>
            <button
              onClick={logout}
              className="bg-purdue-gold text-black px-4 py-2 rounded font-semibold hover:bg-purdue-gold-dark transition-colors"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            {isAdmin ? 'Admin Dashboard' : 'My Dashboard'}
          </h1>
          <p className="text-xl text-gray-600">
            Welcome back, {user?.name}!
          </p>
        </div>

        {/* Admin: Create New Club Button */}
        {isAdmin && (
          <div className="mb-8">
            <Link
              to="/clubs/create"
              className="inline-block bg-purdue-gold text-black px-6 py-3 rounded-lg font-bold hover:bg-purdue-gold-dark transition-colors"
            >
              + Create New Club
            </Link>
          </div>
        )}

        {/* My Clubs Section */}
        <section className="mb-12">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-600 uppercase mb-6">
              MY CLUBS ({isAdmin ? '2' : '2'})
            </h2>

            <div className="space-y-4">
              {/* Club Card 1 */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">Purdue Hackers</h3>
                <p className="text-gray-600 mb-4">
                  {isAdmin 
                    ? '120 members • 3 pending requests' 
                    : 'Member since Jan 2025'}
                </p>
                
                {isAdmin ? (
                  <div className="flex gap-3">
                    <button className="bg-purdue-gold text-black px-6 py-2 rounded font-semibold hover:bg-purdue-gold-dark transition-colors">
                      Manage Club
                    </button>
                    <button className="bg-gray-200 text-black px-6 py-2 rounded font-semibold hover:bg-gray-300 transition-colors">
                      View Requests
                    </button>
                  </div>
                ) : (
                  <button className="bg-gray-200 text-black px-6 py-2 rounded font-semibold hover:bg-gray-300 transition-colors">
                    View Club
                  </button>
                )}
              </div>

              {/* Club Card 2 */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">
                  {isAdmin ? 'Data Mine' : 'Chess Club'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {isAdmin 
                    ? '200 members • 8 pending requests' 
                    : 'Member since Feb 2025'}
                </p>
                
                {isAdmin ? (
                  <div className="flex gap-3">
                    <button className="bg-purdue-gold text-black px-6 py-2 rounded font-semibold hover:bg-purdue-gold-dark transition-colors">
                      Manage Club
                    </button>
                    <button className="bg-gray-200 text-black px-6 py-2 rounded font-semibold hover:bg-gray-300 transition-colors">
                      View Requests
                    </button>
                  </div>
                ) : (
                  <button className="bg-gray-200 text-black px-6 py-2 rounded font-semibold hover:bg-gray-300 transition-colors">
                    View Club
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Student Only: Pending Requests Section */}
        {!isAdmin && (
          <section>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-600 uppercase mb-6">
                PENDING REQUESTS (1)
              </h2>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-3">Data Mine</h3>
                <div className="flex items-center gap-3">
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded font-semibold text-sm">
                    Pending
                  </span>
                  <span className="text-gray-600">
                    Requested on Feb 1, 2025
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Admin Note */}
        {isAdmin && (
          <div className="mt-8 bg-yellow-50 border-l-4 border-purdue-gold p-4">
            <p className="text-gray-700">
              <span className="font-bold">Notes:</span> Create club button, manage existing clubs, see pending requests
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default DashboardPage;