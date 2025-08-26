import { useEffect } from "react";
import Todo from "./Todo";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { getTodos } from "../redux/todoSlice";
import List from "@mui/material/List";

function TodoList() {
    const dispatch = useDispatch<AppDispatch>();
    const userId = useSelector((state: RootState) => state.session.user?.uid);
    const { todos } = useSelector((state: RootState) => state.todo);

    useEffect(() => {
        if (userId) {
            dispatch(getTodos(userId));
        }
    }, [dispatch, userId]);

    return (
        <List>
            {todos.map((todo) => (
                <Todo key={todo.id} todoProps={todo} />
            ))}
        </List>
    );
}

export default TodoList;
