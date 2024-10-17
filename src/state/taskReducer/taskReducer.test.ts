import { deleteTaskAC, setChekedAC, setTaskAC, taskReducer, updateTaskAC } from "./taskReducer";
import { v4 as uuid } from "uuid";

describe("task reducer", () => {
     const todoId1 = uuid();
     const todoId2 = uuid();
     const secondTaskId = uuid();
     const state = {
          [todoId1]: [
               { id: uuid(), title: "found socks", cheked: false },
               { id: uuid(), title: "buy milk", cheked: false },
               { id: uuid(), title: "send message", cheked: false },
          ],
          [todoId2]: [
               { id: uuid(), title: "learn react", cheked: false },
               { id: secondTaskId, title: "make solution for task", cheked: false },
               { id: uuid(), title: "fix car", cheked: false },
          ],
     };

     test("set task dispatch", () => {
          const action = setTaskAC(todoId1, "make somethink");
          const endState = taskReducer(state, action);

          expect(endState[todoId1].length).toBe(4);
          expect(endState[todoId2].length).toBe(3);
          expect(endState[todoId1].find((task) => task.title === "make somethink")?.title).toBe("make somethink");
          expect(endState === state).toBe(false);
     });

     test("delete task dispatch", () => {
          const action = deleteTaskAC(todoId2, secondTaskId);
          const endState = taskReducer(state, action);

          expect(endState[todoId2].length).toBe(2);
          expect(endState[todoId2].find((task) => task.id === secondTaskId)).toBe(undefined);
          expect(endState[todoId1].length).toBe(3);
          expect(endState === state).toBe(false);
     });

     test("update task dispatch", () => {
          const action = updateTaskAC(todoId2, secondTaskId, "go to job");
          const endState = taskReducer(state, action);
          expect(endState[todoId2].find((task) => task.id === secondTaskId)?.title).toBe("go to job");
          expect(endState === state).toBe(false);
     });

     test("set cheked dispatch", () => {
          const action = setChekedAC(todoId2, secondTaskId, true);
          const endState = taskReducer(state, action);
          expect(endState[todoId2].find((task) => task.id === secondTaskId)?.cheked).toBe(true);
          expect(endState === state).toBe(false);
     });
});
