import React from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { TaskType } from "../../App";
import { Form } from "../form/Form";
import { Task } from "../task/Task";
import { EditbleSpan } from "../editbleSpan/EditbleSpan";
type PropsType = {
     id: string;
     title: string;
     tasks: TaskType[];
     setTask: (todoListId: string, value: string) => void;
     updateTask: (todoListId: string, taskId: string, title: string) => void;
     deleteTask: (todoListId: string, taskId: string) => void;
     setCheked: (todoListId: string, taskId: string, cheked: boolean) => void;
};

export const TodoList: React.FC<PropsType> = React.memo((props) => {
     const [parent] = useAutoAnimate();
     return (
          <div>
               <h3>{props.title}</h3>
               <Form
                    placeholder="write a task title"
                    clearAfterSubmit
                    onSubmit={(value: string) => props.setTask(props.id, value)}
               />
               <div ref={parent}>
                    {props.tasks.map((task) => (
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
          </div>
     );
});
