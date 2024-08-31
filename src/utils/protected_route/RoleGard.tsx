import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../redux/features/auth/auth.slice";
import { useAppSelector } from "../../redux/hooks";

const UserProfileGard = ({ children }) => {
    const user = useAppSelector(useCurrentUser);
    const navigate = useNavigate();

    if (!user) return navigate('/auth/login', replace)
    return children
};

export default UserProfileGard;