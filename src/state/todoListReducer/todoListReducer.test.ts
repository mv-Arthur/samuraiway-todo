import { todoListReducer } from "./todoListReducer";
import { v4 as uuid } from "uuid";

describe("todo list reducer", () => {
     const firstId = uuid();
     const secondId = uuid();

     const state = [
          {
               id: firstId,
               title: "what to buy",
               filter: "all",
          },
          {
               id: secondId,
               title: "what to do",
               filter: "completed",
          },
     ];

     test("set todolist", () => {});
});
