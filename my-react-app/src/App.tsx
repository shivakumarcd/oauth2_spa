import { useAuth } from "react-oidc-context";

function App() {
  const auth = useAuth();

  // Steps 4-6 are running (code exchange), or the app is checking for saved tokens
  if (auth.isLoading) {
    return <p>Loading...</p>;
  }

  // Something went wrong (wrong redirect URI, state mismatch, etc.)
  if (auth.error) {
    return <p>Error: {auth.error.message}</p>;
  }

  // Logged in
  if (auth.isAuthenticated) {
    return (
        <div>
          <h1>Welcome, {auth.user?.profile.name ?? auth.user?.profile.preferred_username}</h1>
          <p>Email: {auth.user?.profile.email}</p>
          <button onClick={() => auth.signoutRedirect()}>Logout</button>
        </div>
    );
  }

  // Not logged in (Step 0)
  return (
      <div>
        <h1>My App</h1>
        <button onClick={() => auth.signinRedirect()}>Login</button>
      </div>
  );
}

export default App;