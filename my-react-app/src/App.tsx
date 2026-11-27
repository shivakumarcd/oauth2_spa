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

    if (import.meta.env.DEV && auth.user) {
        const decodeJwt = (token?: string): unknown => {
            if (!token) return "Token was not issued";

            const parts = token.split(".");
            if (parts.length !== 3) return "Token has no readable JWT payload";

            try {
                const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
                const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
                return JSON.parse(new TextDecoder().decode(bytes));
            } catch {
                return "Token has no readable JWT payload";
            }
        };

        console.log("Access token claims:", decodeJwt(auth.user.access_token));
        console.log("ID token claims:", decodeJwt(auth.user.id_token));
        console.log("Refresh token claims:", decodeJwt(auth.user.refresh_token));
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