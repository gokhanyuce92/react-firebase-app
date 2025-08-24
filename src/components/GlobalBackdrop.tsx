import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

function GlobalBackdrop() {
    const loading = useSelector((state: RootState) => state.loading.value);

    return (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export default GlobalBackdrop;
