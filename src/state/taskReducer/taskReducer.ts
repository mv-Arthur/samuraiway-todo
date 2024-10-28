import { v4 as uuid } from "uuid";
import { DeleteTodoListACType, SetTodoListACType, todoId1, todoId2 } from "../todoListReducer/todoListReducer";

export type TaskStateType = {
     [todoListId: string]: TaskType[];
};

export type TaskType = {
     id: string;
     title: string;
     cheked: boolean;
};

const taskTypeState = {
     [todoId1]: [
          { id: uuid(), title: "react", cheked: false },
          { id: uuid(), title: "angular", cheked: false },
          { id: uuid(), title: "vue", cheked: false },
     ],
     [todoId2]: [
          { id: uuid(), title: "milk", cheked: false },
          { id: uuid(), title: "bread", cheked: false },
          { id: uuid(), title: "better", cheked: false },
     ],
};

export const taskReducer = (state: TaskStateType = taskTypeState, action: TaskReducerActionType): TaskStateType => {
     switch (action.type) {
          case "SET-TASK": {
               return {
                    ...state,
                    [action.payload.todolistId]: [
                         ...state[action.payload.todolistId],
                         { id: uuid(), title: action.payload.value, cheked: false },
                    ],
               };
          }

          case "DELETE-TASK": {
               return {
                    ...state,
                    [action.payload.todoListId]: state[action.payload.todoListId].filter(
                         (task) => task.id !== action.payload.taskId,
                    ),
               };
          }

          case "UPDATE-TASK": {
               return {
                    ...state,
                    [action.payload.todoListId]: state[action.payload.todoListId].map((task) =>
                         task.id === action.payload.taskId ? { ...task, title: action.payload.title } : task,
                    ),
               };
          }

          case "SET-CHEKED": {
               return {
                    ...state,
                    [action.payload.todoListId]: state[action.payload.todoListId].map((task) =>
                         task.id === action.payload.taskId ? { ...task, cheked: action.payload.cheked } : task,
                    ),
               };
          }

          case "SET-TODOLIST": {
               return {
                    ...state,
                    [action.payload.id]: [],
               };
          }

          case "DELETE-TODOLIST": {
               const copy = { ...state };
               delete copy[action.payload.todoListId];

               return copy;
          }

          // eslint-disable-next-line no-fallthrough
          default: {
               return state;
          }
     }
};

type TaskReducerActionType =
     | SetTaskACType
     | DeleteTaskACType
     | UpdateTaskACType
     | SetChekedACType
     | SetTodoListACType
     | DeleteTodoListACType;

type SetTaskACType = ReturnType<typeof setTaskAC>;
export const setTaskAC = (todolistId: string, value: string) => {
     return {
          type: "SET-TASK" as const,
          payload: { todolistId, value },
     };
};

type DeleteTaskACType = ReturnType<typeof deleteTaskAC>;
export const deleteTaskAC = (todoListId: string, taskId: string) => {
     return {
          type: "DELETE-TASK" as const,
          payload: { todoListId, taskId },
     };
};

type UpdateTaskACType = ReturnType<typeof updateTaskAC>;
export const updateTaskAC = (todoListId: string, taskId: string, title: string) => {
     return {
          type: "UPDATE-TASK" as const,
          payload: { todoListId, taskId, title },
     };
};

type SetChekedACType = ReturnType<typeof setChekedAC>;
export const setChekedAC = (todoListId: string, taskId: string, cheked: boolean) => {
     return {
          type: "SET-CHEKED" as const,
          payload: { todoListId, taskId, cheked },
     };
};
