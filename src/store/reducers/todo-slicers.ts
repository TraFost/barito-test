import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
	id: number;
	title: string;
	completed?: boolean;
	category: string;
	createdAt?: string;
	isEdited: boolean;
}

interface InitialState {
	todos: Todo[];
}

const initialState: InitialState = {
	todos: [],
};

export const todoSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		addTodo: (state, action: PayloadAction<Todo>) => {
			state.todos.push({
				...action.payload,
				completed: false,
				createdAt: new Date().toISOString(),
			});
		},
		toggleTodo: (state, action: PayloadAction<number>) => {
			state.todos = state.todos.map((todo) =>
				todo.id === action.payload
					? { ...todo, completed: !todo.completed }
					: todo
			);
		},
		deleteTodo: (state, action: PayloadAction<number>) => {
			state.todos = state.todos.filter((todo) => todo.id !== action.payload);
		},
		editTodo: (
			state,
			action: PayloadAction<{ id: number; title: string; category: string }>
		) => {
			state.todos = state.todos.map((todo) =>
				todo.id === action.payload.id
					? {
							...todo,
							title: action.payload.title,
							category: action.payload.category,
							completed: false,
							createdAt: new Date().toISOString(),
							isEdited: false,
					  }
					: todo
			);
		},
		toggleEdit: (state, action: PayloadAction<number>) => {
			console.log(action.payload);

			state.todos = state.todos.map((todo) =>
				todo.id === action.payload
					? { ...todo, isEdited: !todo.isEdited }
					: todo
			);
		},
	},
});

export const { addTodo, toggleTodo, deleteTodo, editTodo, toggleEdit } =
	todoSlice.actions;
export default todoSlice.reducer;
