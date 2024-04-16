import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import userSlicers from "./reducers/user-slicers";
import todoSlicers from "./reducers/todo-slicers";

const rootReducer = combineReducers({
	userInformation: userSlicers,
	userTodo: todoSlicers,
});

export const store = configureStore({
	reducer: rootReducer,
	devTools: import.meta.env.MODE === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
