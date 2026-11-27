import { useAuth } from "react-oidc-context";

export default function User() {
    const auth = useAuth()

    return <p>Hi {auth.user?.profile.name } </p>;
}