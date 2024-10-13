import React from "react";
import { Form } from "./components/form/Form";
import { v4 as uuid } from "uuid";
import { TodoList } from "./components/todoList/TodoList";

export type TaskType = {
     id: string;
     title: string;
     cheked: boolean;
};

type TodoListType = {
     id: string;
     title: string;
     filter: "all" | "completed" | "pending";
};

type TaskStateType = {
     [todoListId: string]: TaskType[];
};

function App() {
     const [todoLists, setTodoLists] = React.useState<TodoListType[]>([]);
     const [tasks, setTasks] = React.useState<TaskStateType>({});

     const setTodoListHanlde = (title: string) => {
          const todoList = { id: uuid(), title, filter: "all" as const };
          setTodoLists([todoList, ...todoLists]);
          setTasks({ [todoList.id]: [], ...tasks });
     };

     const deleteTodoListHandle = (todoListId: string) => {
          setTodoLists(todoLists.filter((todoList) => todoList.id === todoListId));
          const copy = { ...tasks };
          delete copy[todoListId];
          setTasks(copy);
     };

     const setTaskHandle = (todoListId: string, value: string) => {
          setTasks({ ...tasks, [todoListId]: [{ id: uuid(), title: value, cheked: false }, ...tasks[todoListId]] });
     };

     const deleteTaskHandle = (todoListId: string, taskId: string) => {
          setTasks({ ...tasks, [todoListId]: tasks[todoListId].filter((task) => task.id !== taskId) });
     };

     const updateTaskHandle = (todoListId: string, taskId: string, title: string) => {
          setTasks({
               ...tasks,
               [todoListId]: tasks[todoListId].map((task) => (task.id === taskId ? { ...task, title } : task)),
          });
     };

     const setChekedHandle = (todoListId: string, taskId: string, cheked: boolean) => {
          setTasks({
               ...tasks,
               [todoListId]: tasks[todoListId].map((task) => (task.id === taskId ? { ...task, cheked } : task)),
          });
     };

     return (
          <div className="App">
               <Form placeholder="write a todo list title" onSubmit={(title: string) => setTodoListHanlde(title)} />
               {todoLists.map((todoList) => {
                    const tasksForTodoList = tasks[todoList.id];
                    return (
                         <TodoList
                              key={todoList.id}
                              id={todoList.id}
                              title={todoList.title}
                              tasks={tasksForTodoList}
                              setTask={setTaskHandle}
                              updateTask={updateTaskHandle}
                              deleteTask={deleteTaskHandle}
                              setCheked={setChekedHandle}
                         />
                    );
               })}
          </div>
     );
}

export default App;
