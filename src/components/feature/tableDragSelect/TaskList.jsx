import { useContext } from "react";
import { DemoContext } from "./DemoContext";

import "./TaskList.css";
import { Stack } from "@mui/material";

const TaskList = () => {
  const { taskList, selectedTask, setSelectedTask } = useContext(DemoContext);
  return (
    <Stack>
      <h3>Task List</h3>
      <ul>
        {taskList.map((task) => (
          <li key={task.id}>
            <button
              className={`task ${selectedTask?.id === task.id ? "active" : ""}`}
              style={{ background: task.color }}
              onClick={() => setSelectedTask(task)}
            >
              {task.taskName}
            </button>
          </li>
        ))}
        <li>
          <button
            className="task"
            style={{ color: "black" }}
            onClick={() => setSelectedTask(null)}
          >
            Remove
          </button>
        </li>
      </ul>
    </Stack>
  );
};

export default TaskList;
