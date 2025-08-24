import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
            {/* İsterseniz Footer da ekleyebilirsiniz */}
        </>
    );
}

export default MainLayout;
