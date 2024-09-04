import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/auth.slice";
import { Navigate, useLocation } from "react-router-dom";

const RoleGard = ({ children, role }: { children: ReactNode, role: string }) => {
    const location = useLocation();
    const user = useAppSelector(useCurrentUser);

    if (!user) return <Navigate to={'/auth/login'} replace state={location.pathname} />;
    if (user.role !== role) {
        return <Navigate to={'/'} replace />;
    };
    return children;
}

export default RoleGard;