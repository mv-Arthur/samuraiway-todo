import { FilterValuesType } from "../../App";

type TodoListType = {
     id: string;
     title: string;
     filter: FilterValuesType;
};

export const todoListReducer = (state: TodoListType[], action: any) => {};

type TodoListReducerActionType =
     | SetTodoListACType
     | DeleteTodoListACType
     | EditTodoListACType
     | SetTodoListFilterHandleType;

type SetTodoListACType = ReturnType<typeof setTodoListAC>;
const setTodoListAC = (title: string) => {
     return {
          type: "SET-TODOLIST" as const,
          payload: { title },
     };
};

type DeleteTodoListACType = ReturnType<typeof deleteTodoListAC>;
const deleteTodoListAC = (todoListId: string) => {
     return {
          type: "DELETE-TODOLIST" as const,
          payload: { todoListId },
     };
};

type EditTodoListACType = ReturnType<typeof editTodoListAC>;
const editTodoListAC = (todoListId: string, title: string) => {
     return {
          type: "EDIT-TODOLIST" as const,
          payload: { todoListId, title },
     };
};

type SetTodoListFilterHandleType = ReturnType<typeof setTodoListFilterAC>;
const setTodoListFilterAC = (todoListId: string, filter: FilterValuesType) => {
     return {
          type: "SET-FILTER" as const,
          payload: { todoListId, filter },
     };
};
