import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

export function useIsLoggedIn() {
    return useSelector((state: RootState) => state.session.isLoggedIn);
}
