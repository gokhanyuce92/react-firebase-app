import React, { useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import type { AppDispatch } from "../redux/store";
import { addTodo } from "../redux/todoSlice";
import { setLoading } from "../redux/loadingSlice";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import type { TodoType } from "../types/generaltypes";

function TodoCreate() {
    const dispatch = useDispatch<AppDispatch>();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [newTodo, setNewTodo] = useState<string>("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const userId = useSelector((state: RootState) => state.session.user?.uid);
    const { value } = useSelector((state: RootState) => state.loading);

    const handleCreateTodo = useCallback(async () => {
        try {
            if (newTodo.trim() === "") {
                setOpenSnackbar(true);
                return;
            }
            if (!userId) return; // userId yoksa işlem yapma

            const payload: Omit<TodoType, "id"> = {
                text: newTodo,
                completed: false,
                userId,
            };
            dispatch(setLoading(true));
            await dispatch(addTodo(payload));
            setNewTodo("");
            inputRef.current?.focus();
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, newTodo, userId]);

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (value) return;
        if (e.key === "Enter") {
            handleCreateTodo();
        }
    };

    const handleSnackbarClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") return;
        setOpenSnackbar(false);
    };

    return (
        <>
            <Box display="flex" alignItems="center">
                <TextField
                    fullWidth
                    id="standard-basic"
                    label="Yapılacaklar listesine bir görev giriniz"
                    variant="standard"
                    ref={inputRef}
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    autoFocus
                />
                <Button
                    variant="contained"
                    size="medium"
                    endIcon={<SendIcon />}
                    onClick={handleCreateTodo}
                    sx={{ ml: 2, height: "40px" }}
                    disabled={value}
                >
                    Ekle
                </Button>
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <MuiAlert onClose={handleSnackbarClose} severity="warning" sx={{ width: "100%" }}>
                    Boş todo girilemez!
                </MuiAlert>
            </Snackbar>
        </>
    );
}

export default TodoCreate;
