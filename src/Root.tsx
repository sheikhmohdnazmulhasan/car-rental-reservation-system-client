import { Outlet } from "react-router-dom";
import Navbar from "./components/root/Navbar";

const Root = () => {
    return (
        <div >
            <Navbar />
            <div className="min-h-screen"><Outlet /></div>
        </div>
    );
};

export default Root;