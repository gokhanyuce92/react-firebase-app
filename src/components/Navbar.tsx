import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useIsLoggedIn } from "../redux/useIsLoggedIn";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";

export default function Navbar() {
    const isLoggedIn = useIsLoggedIn();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.session);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigateTo = (path: string) => {
        navigate(path);
        handleClose();
    };

    const logout = async () => {
        try {
            await signOut(auth);
            navigate("/auth");
        } catch (error) {
            alert("Çıkış sırasında bir hata oluştu.");
        }
    };

    if (!isLoggedIn) return null;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleClick}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="fade-menu"
                        MenuListProps={{
                            "aria-labelledby": "fade-button",
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                    >
                        <MenuItem onClick={() => navigateTo("/")}>Anasayfa</MenuItem>
                        <MenuItem onClick={() => navigateTo("/about")}>Hakkımızda</MenuItem>
                    </Menu>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {user?.email}
                    </Typography>
                    <Tooltip title="Exit" onClick={logout} sx={{ color: "white" }}>
                        <IconButton>
                            <LogoutIcon sx={{ fontSize: 30 }} />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
