import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Container from "@mui/material/Container";

function MainLayout() {
    return (
        <>
            <Navbar />
            <Container
                maxWidth="md"
                sx={{ mt: 1, backgroundColor: "#f5f5f5", height: "calc(100vh - 76px)" }}
            >
                <Outlet />
            </Container>
            {/* İsterseniz Footer da ekleyebilirsiniz */}
        </>
    );
}

export default MainLayout;
