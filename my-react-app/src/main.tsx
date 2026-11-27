import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import type { AuthProviderProps } from "react-oidc-context";
import { AuthProvider } from "react-oidc-context";
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router';
import App from './App.tsx'
import About from './About.tsx'
import ProtectedUser from './ProtectedUser.tsx'
//import './index.css'

const oidcConfig: AuthProviderProps = {
    authority: "http://localhost:8081/realms/myrealm", // Keycloak realm
    client_id: "my-react-app",                         // client registered in Phase 2b
    redirect_uri: "http://localhost:5173/callback",    // must match Keycloak exactly
    post_logout_redirect_uri: "http://localhost:5173/logout",
    scope: "openid profile email",
};

export function AppRoutes() {
    return (
        <div>
            <nav aria-label="Main navigation">
                <Link to="/home12">Home</Link>{' · '}
                <Link to="/user">User</Link>{' · '}
                <Link to="/about">About</Link>
            </nav>

            <Routes>
                <Route path="/user" element={<ProtectedUser />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<App />} />
            </Routes>
        </div>
    );
}

function AuthenticatedApp() {
    const navigate = useNavigate();

    return (
        <AuthProvider
            {...oidcConfig}
            onSigninCallback={() => { void navigate('/home11', { replace: true }); }}
        >
            <AppRoutes />
        </AuthProvider>
    );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <AuthenticatedApp />
      </BrowserRouter>
  </StrictMode>,
)
