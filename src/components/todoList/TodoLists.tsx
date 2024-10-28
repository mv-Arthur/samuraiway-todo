import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../state/store";
import {
     deleteTodoListAC,
     editTodoListAC,
     setTodoListAC,
     setTodoListFilterAC,
     TodoListType,
} from "../../state/todoListReducer/todoListReducer";
import { v4 as uuid } from "uuid";
import { FilterValuesType } from "../../App";
import Container from "@mui/material/Container";
import { Form } from "../form/Form";
import { TodoList } from "./TodoList";
import { TransitionGroup } from "../transition/TransitonGroup";

export const TodoLists = React.memo(() => {
     const dispatch = useDispatch();
     const todoLists = useSelector<RootStateType, TodoListType[]>((state) => state.todoLists);

     const setTodoListHanlde = React.useCallback((title: string) => {
          const todoListId = uuid();
          dispatch(setTodoListAC(todoListId, title));
     }, []);

     const deleteTodoListHandle = React.useCallback((todoListId: string) => {
          dispatch(deleteTodoListAC(todoListId));
     }, []);

     const editTodoListHandle = React.useCallback((todolistId: string, title: string) => {
          dispatch(editTodoListAC(todolistId, title));
     }, []);

     const setTodolistFilterHandle = React.useCallback((todoListId: string, filter: FilterValuesType) => {
          dispatch(setTodoListFilterAC(todoListId, filter));
     }, []);

     return (
          <Container maxWidth="lg">
               <Form limit={10} placeholder="write a todo list title" onSubmit={setTodoListHanlde} clearAfterSubmit />
               <TransitionGroup
                    style={{
                         display: "flex",
                         gap: "10px",
                         flexWrap: "wrap",
                    }}
               >
                    {todoLists.map((todoList) => {
                         return (
                              <TodoList
                                   key={todoList.id}
                                   id={todoList.id}
                                   title={todoList.title}
                                   deleteTodoList={deleteTodoListHandle}
                                   editTodolist={editTodoListHandle}
                                   setTodoListFilter={setTodolistFilterHandle}
                                   filter={todoList.filter}
                              />
                         );
                    })}
               </TransitionGroup>
          </Container>
     );
});
