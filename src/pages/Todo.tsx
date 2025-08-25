import React, { useState } from "react";
import { FaCheck, FaRegEdit } from "react-icons/fa";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import type { TodoType } from "../types/Types";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../redux/todoSlice";
import type { AppDispatch } from "../redux/store";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

interface TodoProps {
    todoProps: TodoType;
}

function Todo({ todoProps }: TodoProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(todoProps.text);

    const handleRemove = () => {
        if (todoProps.id) dispatch(deleteTodo(todoProps.id));
    };

    const handleEdit = () => setIsEditing(true);

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setEditValue(e.target.value);

    const handleEditSave = () => {
        if (editValue.trim() === "") return;
        dispatch(updateTodo({ ...todoProps, text: editValue }));
        setIsEditing(false);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleEditSave();
    };

    return (
        <ListItem
            sx={{ width: "100%" }}
            secondaryAction={
                <Box>
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
                    fullWidth
                />
            ) : (
                <ListItemText primary={todoProps.text} />
            )}
        </ListItem>
    );
}

export default Todo;
