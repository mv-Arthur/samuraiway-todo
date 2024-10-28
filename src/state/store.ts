import { combineReducers, legacy_createStore } from "redux";
import { taskReducer } from "./taskReducer/taskReducer";
import { todoListReducer } from "./todoListReducer/todoListReducer";

const rootState = combineReducers({ tasks: taskReducer, todoLists: todoListReducer });

export type RootStateType = ReturnType<typeof rootState>;

export const store = legacy_createStore(rootState);

//@ts-ignore
window.store = store;
