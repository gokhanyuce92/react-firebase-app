import React, { useState } from "react";
import { FaCheck, FaRegEdit } from "react-icons/fa";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../redux/todoSlice";
import { setLoading } from "../redux/loadingSlice";
import type { AppDispatch } from "../redux/store";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import type { TodoProps } from "../types/propstypes";

function Todo({ todoProps }: TodoProps) {
    const { id, text, completed } = todoProps;
    const dispatch = useDispatch<AppDispatch>();
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(text);
    const isCompleted = completed;

    const handleRemove = async () => {
        if (!id) return;
        try {
            dispatch(setLoading(true));
            await dispatch(deleteTodo(id));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleEdit = () => setIsEditing(true);

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setEditValue(e.target.value);

    const handleEditSave = async () => {
        if (editValue.trim() === "") return;
        try {
            dispatch(setLoading(true));
            await dispatch(updateTodo({ ...todoProps, text: editValue }));
            setIsEditing(false);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleComplete = async () => {
        if (isCompleted) return;

        try {
            dispatch(setLoading(true));
            await dispatch(updateTodo({ ...todoProps, completed: true }));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleEditSave();
    };

    return (
        <ListItem
            sx={{ width: "100%", bgcolor: isCompleted ? "grey.300" : "background.paper", mb: 0.5 }}
            secondaryAction={
                <Box>
                    {!isCompleted && (
                        <>
                            <IconButton edge="end" onClick={handleRemove}>
                                <IoMdRemoveCircleOutline />
                            </IconButton>
                            {isEditing ? (
                                <IconButton edge="end" onClick={handleEditSave}>
                                    <FaCheck />
                                </IconButton>
                            ) : (
                                <IconButton edge="end" onClick={handleEdit}>
                                    <FaRegEdit />
                                </IconButton>
                            )}
                        </>
                    )}
                    <Tooltip title={isCompleted ? "Tamamlandı" : "Tamamla"}>
                        <IconButton
                            edge="end"
                            color={isCompleted ? "success" : "default"}
                            onClick={handleComplete}
                            aria-label="complete"
                            sx={{
                                ml: 1,
                                border: "1px solid",
                                borderColor: isCompleted ? "success.main" : "grey.400",
                            }}
                        >
                            <CheckCircleIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            }
        >
            {isEditing ? (
                <TextField
                    value={editValue}
                    onChange={handleEditChange}
                    onKeyDown={handleInputKeyDown}
                    autoFocus
                    variant="standard"
                    sx={{ width: "90%" }}
                />
            ) : (
                <ListItemText primary={text} />
            )}
        </ListItem>
    );
}

export default Todo;
