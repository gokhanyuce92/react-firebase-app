import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";
import type { RootState, AppDispatch } from "../redux/store";
import type { TodoType } from "../types/generaltypes";
import { setTodos } from "../redux/todoSlice";
import type { TodoListProps } from "../types/propstypes";

export function useTodosRealtime({ status }: TodoListProps) {
    const dispatch = useDispatch<AppDispatch>();
    const userId = useSelector((state: RootState) => state.session.user?.uid);
    const isCompleted: boolean = status === "completed";

    useEffect(() => {
        if (!userId) return;
        const q = collection(db, "todos");
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const todos: TodoType[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data() as TodoType;
                if (data.userId === userId && data.completed === isCompleted) {
                    todos.push({ ...data, id: doc.id });
                }
            });
            dispatch(setTodos(todos));
        });
        return () => unsubscribe();
    }, [dispatch, userId]);
}
