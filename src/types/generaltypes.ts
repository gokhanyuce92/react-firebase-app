export type TodoInitialState = {
    todos: TodoType[];
};

export type TodoType = {
    id: string;
    text: string;
    completed: boolean;
    userId: string;
    sequenceId?: number; // Otomatik artan sıra numarası
};
