import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Container from "@mui/material/Container";

function MainLayout() {
    return (
        <>
            <Navbar />
            <Container
                maxWidth="md"
                sx={{
                    mt: 2,
                    backgroundColor: "lightgray",
                    height: "90vh",
                    overflowY: "auto",
                    borderRadius: 2,
                }}
            >
                <Outlet />
            </Container>
            {/* İsterseniz Footer da ekleyebilirsiniz */}
        </>
    );
}

export default MainLayout;
