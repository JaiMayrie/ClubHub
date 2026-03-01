import { useAuth } from "../hooks/useAuth";

function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.name}</p>
      <button type="button" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default DashboardPage;
