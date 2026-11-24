import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import type { AuthProviderProps } from "react-oidc-context";
import { AuthProvider } from "react-oidc-context";
//import './index.css'
import App from './App.tsx'

const oidcConfig: AuthProviderProps = {
    authority: "http://localhost:8081/realms/myrealm", // Keycloak realm
    client_id: "my-react-app",                         // client registered in Phase 2b
    redirect_uri: "http://localhost:5173/callback",    // must match Keycloak exactly
    post_logout_redirect_uri: "http://localhost:5173/logout",
    scope: "openid profile email",
    onSigninCallback: () => {
        // remove ?code=...&state=... from the address bar and go to /home
        window.history.replaceState({}, document.title, "/home");
    },
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthProvider {...oidcConfig}>
          <App />
      </AuthProvider>
  </StrictMode>,
)
