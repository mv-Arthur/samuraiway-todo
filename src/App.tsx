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

     const updateTask = (taskId: string, title: string) => {
          setTasks((tasks) => tasks.map((task) => (task.id === taskId ? { ...task, title: title } : task)));
     };

     const setCheked = (taskId: string, cheked: boolean) => {
          setTasks((tasks) => tasks.map((task) => (task.id === taskId ? { ...task, cheked } : task)));
     };

     return (
          <div className="App">
               <Form clearAfterSubmit onSubmit={submitHanlde} />
               <div ref={parent}>
                    {tasks.map((task) => (
                         <Task
                              key={task.id}
                              updateTask={updateTask}
                              cheked={task.cheked}
                              id={task.id}
                              onRemove={deleteTask}
                              setCheked={setCheked}
                         >
                              {task.title}
                         </Task>
                    ))}
               </div>
          </div>
     );
}

export default App;
