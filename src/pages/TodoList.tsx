import Todo from "./Todo";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import List from "@mui/material/List";
import type { TodoType } from "../types/generaltypes";
import { useTodosRealtime } from "../hooks/useTodosRealtime";

function TodoList() {
    const { todos } = useSelector((state: RootState) => state.todo);

    // sequenceId'ye göre ASC (küçükten büyüğe) sıralama
    const sortedTodos = [...todos].sort((a, b) => (a.sequenceId ?? 0) - (b.sequenceId ?? 0));

    useTodosRealtime();

    return (
        <List>
            {sortedTodos.map((todo: TodoType) => (
                <Todo key={todo.id} todoProps={todo} />
            ))}
        </List>
    );
}

export default TodoList;
