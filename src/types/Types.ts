export interface TodoInitialState {
    todos: TodoType[];
}

export interface TodoType {
    id: string;
    text: string;
    completed: boolean;
}
