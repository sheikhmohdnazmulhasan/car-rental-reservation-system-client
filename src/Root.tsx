import { Outlet } from "react-router-dom";

const Root = () => {
    return (
        <div className="overflow-hidden">
            {/* <Navbar /> */}
            <div className="min-h-screen bg-gray-50"><Outlet /></div>
            {/* <Footer /> */}
        </div>
    );
};

export default Root;