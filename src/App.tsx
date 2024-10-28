import { TodoLists } from "./components/todoList/TodoLists";
import React from "react";
export type FilterValuesType = "all" | "completed" | "pending";

export const App = () => {
     return <TodoLists />;
};
