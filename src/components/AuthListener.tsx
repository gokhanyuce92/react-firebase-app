import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";
import { logIn, logOut } from "../redux/sessionSlice";
import type { ReactNode } from "react";

interface AuthListenerProps {
    children: ReactNode;
}

const AuthListener = ({ children }: AuthListenerProps) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userCredential) => {
            if (userCredential) {
                const userData = {
                    uid: userCredential.uid,
                    email: userCredential.email,
                    displayName: userCredential.displayName,
                };
                dispatch(logIn(userData));
            } else {
                dispatch(logOut());
            }
        });
        return () => unsubscribe();
    }, [dispatch]);
    return <>{children}</>;
};

export default AuthListener;
