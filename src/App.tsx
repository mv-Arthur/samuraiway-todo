import React from "react";
import { Form } from "./components/form/Form";
import { v4 as uuid } from "uuid";
import { TodoList } from "./components/todoList/TodoList";
import Container from "@mui/material/Container";
import styled from "styled-components";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
     addEmptyTasksAC,
     deleteTaskAC,
     removeTasksAC,
     setChekedAC,
     setTaskAC,
     taskReducer,
     updateTaskAC,
} from "./state/taskReducer/taskReducer";
import {
     deleteTodoListAC,
     editTodoListAC,
     setTodoListAC,
     setTodoListFilterAC,
     todoListReducer,
} from "./state/todoListReducer/todoListReducer";

export type FilterValuesType = "all" | "completed" | "pending";

function App() {
     const [todoLists, dispatchTodoLists] = React.useReducer(todoListReducer, []);
     const [tasks, dispatchTasks] = React.useReducer(taskReducer, {});

     const [parent] = useAutoAnimate();
     const setTodoListHanlde = (title: string) => {
          const todoListId = uuid();
          dispatchTodoLists(setTodoListAC(todoListId, title));
          dispatchTasks(addEmptyTasksAC(todoListId));
     };

     const deleteTodoListHandle = (todoListId: string) => {
          dispatchTodoLists(deleteTodoListAC(todoListId));
          dispatchTasks(removeTasksAC(todoListId));
     };

     const editTodoListHandle = (todolistId: string, title: string) => {
          dispatchTodoLists(editTodoListAC(todolistId, title));
     };

     const setTodolistFilterHandle = (todoListId: string, filter: FilterValuesType) => {
          dispatchTodoLists(setTodoListFilterAC(todoListId, filter));
     };

     const setTaskHandle = (todoListId: string, value: string) => {
          dispatchTasks(setTaskAC(todoListId, value));
     };

     const deleteTaskHandle = (todoListId: string, taskId: string) => {
          dispatchTasks(deleteTaskAC(todoListId, taskId));
     };

     const updateTaskHandle = (todoListId: string, taskId: string, title: string) => {
          dispatchTasks(updateTaskAC(todoListId, taskId, title));
     };

     const setChekedHandle = (todoListId: string, taskId: string, cheked: boolean) => {
          dispatchTasks(setChekedAC(todoListId, taskId, cheked));
     };

     return (
          <div className="App">
               <Container maxWidth="lg">
                    <Form
                         placeholder="write a todo list title"
                         onSubmit={(title: string) => setTodoListHanlde(title)}
                         clearAfterSubmit
                    />
                    <S.TodoListContainer ref={parent}>
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
                                        deleteTodoList={deleteTodoListHandle}
                                        editTodolist={editTodoListHandle}
                                        setTodoListFilter={setTodolistFilterHandle}
                                        filter={todoList.filter}
                                   />
                              );
                         })}
                    </S.TodoListContainer>
               </Container>
          </div>
     );
}

const S = {
     TodoListContainer: styled.div`
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
     `,
};

export default App;
