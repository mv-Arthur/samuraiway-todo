import {
     deleteTodoListAC,
     editTodoListAC,
     setTodoListAC,
     setTodoListFilterAC,
     todoListReducer,
} from "./todoListReducer";
import { v4 as uuid } from "uuid";

describe("todo list reducer", () => {
     const firstId = uuid();
     const secondId = uuid();

     const state = [
          {
               id: firstId,
               title: "what to buy",
               filter: "all" as const,
          },
          {
               id: secondId,
               title: "what to do",
               filter: "completed" as const,
          },
     ];

     test("set todolist", () => {
          const todoListId = uuid();
          const action = setTodoListAC(todoListId, "create airplane");
          const endState = todoListReducer(state, action);

          expect(endState.length).toBe(3);
          expect(endState[0].title).toBe("create airplane");

          expect(endState === state).toBe(false);
     });

     test("delete todolist", () => {
          const action = deleteTodoListAC(secondId);
          const endState = todoListReducer(state, action);

          expect(endState.length).toBe(1);
          expect(endState === state).toBe(false);
     });

     test("edit todolist", () => {
          const action = editTodoListAC(firstId, "what to create");
          const endState = todoListReducer(state, action);

          expect(endState.find((todolist) => todolist.id === firstId)?.title).toBe("what to create");
          expect(endState === state).toBe(false);
     });

     test("set filter todo", () => {
          const action = setTodoListFilterAC(secondId, "pending");
          const endState = todoListReducer(state, action);

          expect(endState.find((todolist) => todolist.id === secondId)?.filter).toBe("pending");
     });
});
