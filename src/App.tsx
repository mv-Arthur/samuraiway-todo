import React from "react";
import { Form } from "./components/form/Form";
import { Task } from "./components/task/Task";
import { v4 as uuid } from "uuid";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type TaskType = {
     id: string;
     title: string;
     cheked: boolean;
};

function App() {
     const [tasks, setTasks] = React.useState<TaskType[]>([]);
     const [parent] = useAutoAnimate();
     const submitHanlde = (value: string) => {
          setTasks([{ id: uuid(), title: value, cheked: false }, ...tasks]);
     };

     const deleteTask = (taskId: string) => {
          setTasks((tasks) => tasks.filter((task) => task.id !== taskId));
     };

     return (
          <div className="App">
               <Form onSubmit={submitHanlde} />
               <div ref={parent}>
                    {tasks.map((task) => (
                         <Task key={task.id} cheked={task.cheked} id={task.id} onRemove={deleteTask}>
                              {task.title}
                         </Task>
                    ))}
               </div>
          </div>
     );
}

export default App;
