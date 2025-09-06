import type { TodoType } from "./generaltypes";

export type TodoListProps = {
    status: "active" | "completed" | "deleted";
};

export type TodoProps = {
    todoProps: TodoType;
};
