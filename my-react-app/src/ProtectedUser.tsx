import User from "./User.tsx";
import {useAuth} from "react-oidc-context";
import {Navigate} from "react-router";

export default function ProtectedUser() {
    const auth = useAuth();

    if (auth.isLoading) {
        return <p>Loading...</p>;
    }

    if (auth.error) {
        return <p>Error: {auth.error.message}</p>;
    }

    if (!auth.isAuthenticated) {
        return <Navigate to="/home10" replace />;
    }

    return <User />;
}