import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentUser } from "../../redux/features/auth/auth.slice";
import { Navigate, useLocation } from "react-router-dom";

const RoleGard = ({ children, role }: { children: ReactNode, role: string }) => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const user = useAppSelector(useCurrentUser);
    if (!user) return <Navigate to={'/auth/login'} replace state={location.pathname} />;
    if (user.role !== role) {
        dispatch(logout());
        return <Navigate to={'/auth/login'} replace state={location.pathname} />;
    };
    return children;
}

export default RoleGard;