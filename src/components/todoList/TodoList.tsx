import React from "react";
import { FilterValuesType } from "../../App";
import { Form } from "../form/Form";
import { Task } from "../task/Task";
import { EditbleSpan } from "../editbleSpan/EditbleSpan";

import { deleteTaskAC, setChekedAC, setTaskAC, TaskType, updateTaskAC } from "../../state/taskReducer/taskReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../state/store";
import { ButtonGroup } from "../buttonGroup/ButtonGroup";
import { TransitionGroup } from "../transition/TransitonGroup";

type Props = {
     id: string;
     title: string;
     filter: FilterValuesType;
     deleteTodoList: (todolistId: string) => void;
     editTodolist: (todolistId: string, title: string) => void;
     setTodoListFilter: (todoListId: string, filter: FilterValuesType) => void;
};

export const TodoList: React.FC<Props> = React.memo(({ ...props }) => {
     const dispatch = useDispatch();
     const tasks = useSelector<RootStateType, TaskType[]>((state) => state.tasks[props.id]);

     const onRemoveHandle = React.useCallback((todolistId: string) => {
          props.deleteTodoList(todolistId);
     }, []);

     const onEditHandle = React.useCallback((title: string) => {
          props.editTodolist(props.id, title);
     }, []);

     const changeButtonGroupHandle = React.useCallback((value: FilterValuesType) => {
          props.setTodoListFilter(props.id, value);
     }, []);

     const setTaskHandle = React.useCallback((value: string) => {
          dispatch(setTaskAC(props.id, value));
     }, []);

     const deleteTaskHandle = React.useCallback((taskId: string) => {
          dispatch(deleteTaskAC(props.id, taskId));
     }, []);

     const updateTaskHandle = React.useCallback((taskId: string, title: string) => {
          dispatch(updateTaskAC(props.id, taskId, title));
     }, []);

     const setChekedHandle = React.useCallback((taskId: string, cheked: boolean) => {
          dispatch(setChekedAC(props.id, taskId, cheked));
     }, []);

     const filteredTasks = React.useMemo(() => {
          if (props.filter === "completed") {
               return tasks.filter((task) => task.cheked);
          }

          if (props.filter === "pending") {
               return tasks.filter((task) => !task.cheked);
          }

          return tasks;
     }, [tasks, props.filter]);

     return (
          <div>
               <EditbleSpan id={props.id} onRemove={onRemoveHandle} onSubmit={onEditHandle}>
                    {props.title}
               </EditbleSpan>
               <Form placeholder="write a task title" clearAfterSubmit onSubmit={setTaskHandle} />
               <TransitionGroup>
                    {filteredTasks.map((task) => (
                         <Task
                              key={task.id}
                              cheked={task.cheked}
                              id={task.id}
                              onRemove={deleteTaskHandle}
                              updateTask={updateTaskHandle}
                              setCheked={setChekedHandle}
                         >
                              {task.title}
                         </Task>
                    ))}
               </TransitionGroup>

               <ButtonGroup value={props.filter} onChange={changeButtonGroupHandle} />
          </div>
     );
});
