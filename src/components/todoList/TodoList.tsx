import React from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { FilterValuesType } from "../../App";
import { Form } from "../form/Form";
import { Task } from "../task/Task";
import { EditbleSpan } from "../editbleSpan/EditbleSpan";
import Button from "@mui/material/Button";
import { TaskType } from "../../state/taskReducer/taskReducer";

type PropsType = {
     id: string;
     title: string;
     tasks: TaskType[];
     setTask: (todoListId: string, value: string) => void;
     updateTask: (todoListId: string, taskId: string, title: string) => void;
     deleteTask: (todoListId: string, taskId: string) => void;
     setCheked: (todoListId: string, taskId: string, cheked: boolean) => void;
     deleteTodoList: (todolistId: string) => void;
     editTodolist: (todolistId: string, title: string) => void;
     setTodoListFilter: (todoListId: string, filter: FilterValuesType) => void;
     filter: FilterValuesType;
};

export const TodoList: React.FC<PropsType> = React.memo((props) => {
     const [parent] = useAutoAnimate();

     const onRemoveHandle = (todolistId: string) => {
          props.deleteTodoList(todolistId);
     };

     const onEditHandle = (title: string) => {
          props.editTodolist(props.id, title);
     };

     let tasksFilterMatched = props.tasks;

     if (props.filter === "completed") {
          tasksFilterMatched = tasksFilterMatched.filter((task) => task.cheked);
     }

     if (props.filter === "pending") {
          tasksFilterMatched = tasksFilterMatched.filter((task) => !task.cheked);
     }

     return (
          <>
               <EditbleSpan id={props.id} onRemove={onRemoveHandle} onSubmit={onEditHandle}>
                    {props.title}
               </EditbleSpan>
               <Form
                    placeholder="write a task title"
                    clearAfterSubmit
                    onSubmit={(value: string) => props.setTask(props.id, value)}
               />
               <div ref={parent}>
                    {tasksFilterMatched.map((task) => (
                         <Task
                              key={task.id}
                              updateTask={(taskId: string, title: string) => props.updateTask(props.id, taskId, title)}
                              cheked={task.cheked}
                              id={task.id}
                              onRemove={(taskId: string) => props.deleteTask(props.id, taskId)}
                              setCheked={(taskId: string, cheked: boolean) => props.setCheked(props.id, taskId, cheked)}
                         >
                              {task.title}
                         </Task>
                    ))}
               </div>
               <div style={{ display: "flex", gap: "10px" }}>
                    <Button
                         color="primary"
                         variant={props.filter === "all" ? "contained" : "outlined"}
                         onClick={() => props.setTodoListFilter(props.id, "all")}
                    >
                         all
                    </Button>
                    <Button
                         color="success"
                         variant={props.filter === "completed" ? "contained" : "outlined"}
                         onClick={() => props.setTodoListFilter(props.id, "completed")}
                    >
                         completed
                    </Button>
                    <Button
                         color="secondary"
                         variant={props.filter === "pending" ? "contained" : "outlined"}
                         onClick={() => props.setTodoListFilter(props.id, "pending")}
                    >
                         pending
                    </Button>
               </div>
          </>
     );
});
