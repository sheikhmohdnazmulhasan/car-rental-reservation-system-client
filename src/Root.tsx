import { Outlet } from "react-router-dom";
import Navbar from "./components/root/Navbar";

const Root = () => {
    return (
        <div >
            <Navbar />
            <div className="min-h-screen bg-gray-50"><Outlet /></div>
        </div>
    );
};

export default Root;