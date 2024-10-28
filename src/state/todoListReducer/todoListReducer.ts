import { FilterValuesType } from "../../App";
import { v4 as uuid } from "uuid";

export type TodoListType = {
     id: string;
     title: string;
     filter: FilterValuesType;
};

export const todoId1 = uuid();
export const todoId2 = uuid();

const todosStartState: TodoListType[] = [
     // { id: todoId1, title: "what to learn", filter: "all" as const },
     // { id: todoId2, title: "what to buy", filter: "all" as const },
];

export const todoListReducer = (
     state: TodoListType[] = todosStartState,
     action: TodoListReducerActionType,
): TodoListType[] => {
     switch (action.type) {
          case "SET-TODOLIST": {
               // return state;
               return [{ id: action.payload.id, title: action.payload.title, filter: "all" }, ...state];
          }

          case "DELETE-TODOLIST": {
               return state.filter((todoList) => todoList.id !== action.payload.todoListId);
          }

          case "EDIT-TODOLIST": {
               return state.map((todoList) =>
                    todoList.id === action.payload.todoListId ? { ...todoList, title: action.payload.title } : todoList,
               );
          }

          case "SET-FILTER": {
               return state.map((todoList) =>
                    todoList.id === action.payload.todoListId
                         ? { ...todoList, filter: action.payload.filter }
                         : todoList,
               );
          }

          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          default: {
               return state;
          }
     }
};

type TodoListReducerActionType =
     | SetTodoListACType
     | DeleteTodoListACType
     | EditTodoListACType
     | SetTodoListFilterHandleType;

export type SetTodoListACType = ReturnType<typeof setTodoListAC>;
export const setTodoListAC = (id: string, title: string) => {
     return {
          type: "SET-TODOLIST" as const,
          payload: { id, title },
     };
};

export type DeleteTodoListACType = ReturnType<typeof deleteTodoListAC>;
export const deleteTodoListAC = (todoListId: string) => {
     return {
          type: "DELETE-TODOLIST" as const,
          payload: { todoListId },
     };
};

type EditTodoListACType = ReturnType<typeof editTodoListAC>;
export const editTodoListAC = (todoListId: string, title: string) => {
     return {
          type: "EDIT-TODOLIST" as const,
          payload: { todoListId, title },
     };
};

type SetTodoListFilterHandleType = ReturnType<typeof setTodoListFilterAC>;
export const setTodoListFilterAC = (todoListId: string, filter: FilterValuesType) => {
     return {
          type: "SET-FILTER" as const,
          payload: { todoListId, filter },
     };
};
