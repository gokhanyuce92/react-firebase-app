import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TodoInitialState, TodoType } from "../types/Types";
import { db } from "../Firebase";
import { collection, doc, addDoc, getDocs, deleteDoc, updateDoc } from "firebase/firestore";

const initialState: TodoInitialState = {
    todos: [],
};

// Tüm todo'ları getir
export const getTodos = createAsyncThunk<TodoType[]>("getTodos", async () => {
    const querySnapshot = await getDocs(collection(db, "todos"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as TodoType[];
});

// Yeni todo ekle
export const addTodo = createAsyncThunk<TodoType, Omit<TodoType, "id">>("addTodo", async (todo) => {
    const docRef = await addDoc(collection(db, "todos"), {
        text: todo.text,
        completed: todo.completed,
    });
    return { ...todo, id: docRef.id };
});

// Todo sil
export const deleteTodo = createAsyncThunk<string, string>("deleteTodo", async (id) => {
    await deleteDoc(doc(db, "todos", id));
    return id;
});

export const updateTodo = createAsyncThunk<TodoType, TodoType>("updateTodo", async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
        text: todo.text,
        completed: todo.completed,
    });
    return todo;
});

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTodos.fulfilled, (state, action: PayloadAction<TodoType[]>) => {
                state.todos = action.payload;
            })
            .addCase(addTodo.fulfilled, (state, action: PayloadAction<TodoType>) => {
                state.todos.push(action.payload);
            })
            .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
                state.todos = state.todos.filter((todo) => todo.id !== action.payload);
            })
            .addCase(updateTodo.fulfilled, (state, action: PayloadAction<TodoType>) => {
                state.todos = state.todos.map((todo) =>
                    todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
                );
            });
    },
});

export default todoSlice.reducer;
