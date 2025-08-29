import Todo from "./Todo";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import List from "@mui/material/List";
import type { TodoType } from "../types/generaltypes";
import { useTodosRealtime } from "../redux/useTodosRealtime";

function TodoList() {
    const { todos } = useSelector((state: RootState) => state.todo);

    // useEffect(() => {
    //     if (userId) {
    //         dispatch(getTodos(userId));
    //     }
    // }, [dispatch, userId]);

    useTodosRealtime();

    return (
        <List>
            {todos.map((todo: TodoType) => (
                <Todo key={todo.id} todoProps={todo} />
            ))}
        </List>
    );
}

export default TodoList;
