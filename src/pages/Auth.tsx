import React, { useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../Firebase";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/loadingSlice";
import { useFormik } from "formik";
import { userSchema, type userSchemaValues } from "../schema/userSchema";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const provider = new GoogleAuthProvider();

// Ortak hata gösterim fonksiyonu
const showError = (error: unknown, defaultMsg: string) => {
    if (error instanceof FirebaseError) {
        toast.error(error.message);
    } else if (typeof error === "object" && error !== null && "message" in error) {
        toast.error((error as { message: string }).message);
    } else {
        toast.error(defaultMsg);
    }
};

function Auth() {
    const [isSubmitting, setIsSubmitting] = useState(false); // local submit state
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { values, errors, handleSubmit, handleChange } = useFormik<userSchemaValues>({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: userSchema,
        onSubmit: (values) => {
            handleLogin(values);
        },
    });

    useEffect(() => {
        const logout = async () => {
            await signOut(auth);
        };
        logout();
    }, []);

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // };

    const loginWithGoogle = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setLoading(true));
        setIsSubmitting(true);
        try {
            const response = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(response);
            const token = credential?.accessToken;
            if (token) {
                navigate("/");
            } else {
                toast.error("Google ile girişte bir sorun oluştu.");
            }
        } catch (error: any) {
            if (error?.code === "auth/popup-closed-by-user") {
                toast.info("Google giriş penceresi kapatıldı.");
            } else {
                showError(error, "Google ile giriş sırasında bir hata oluştu.");
            }
        } finally {
            dispatch(setLoading(false));
            setIsSubmitting(false);
        }
    };

    const handleLogin = async (values: userSchemaValues) => {
        dispatch(setLoading(true));
        setIsSubmitting(true);
        try {
            const response = await signInWithEmailAndPassword(auth, values.email, values.password);
            if (response.user) {
                navigate("/");
            }
        } catch (error) {
            showError(error, "Bilinmeyen bir hata oluştu.");
        } finally {
            dispatch(setLoading(false));
            setIsSubmitting(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setLoading(true));
        setIsSubmitting(true);
        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );
            if (response.user) {
                toast.success("Kullanıcı oluşturuldu!");
                // Kayıt sonrası otomatik giriş ve yönlendirme
                navigate("/");
            }
        } catch (error) {
            showError(error, "Bilinmeyen bir hata oluştu.");
        } finally {
            dispatch(setLoading(false));
            setIsSubmitting(false);
        }
    };

    return (
        <Container
            maxWidth="xs"
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <form autoComplete="on" onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    size="medium"
                    label="Email"
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange}
                    helperText={errors.email}
                    error={Boolean(errors.email)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    size="medium"
                    label="Şifre"
                    variant="outlined"
                    value={values.password}
                    onChange={handleChange}
                    helperText={errors.password}
                    error={Boolean(errors.password)}
                    sx={{ mb: 2 }}
                />
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Button
                        variant="outlined"
                        startIcon={<FaGoogle />}
                        onClick={loginWithGoogle}
                        disabled={isSubmitting}
                    >
                        Google ile Giriş Yap
                    </Button>
                    <Button variant="outlined" type="submit" disabled={isSubmitting}>
                        Giriş Yap
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={handleRegister}
                        disabled={isSubmitting}
                        style={{ display: "none" }}
                    >
                        Kaydol
                    </Button>
                </Stack>
            </form>
        </Container>
    );
}

export default Auth;
