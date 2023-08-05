/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const DemoContext = createContext();

const baseUserList = [
  {
    id: 1,
    name: "Kenneth Ebora",
    tasks: [
      {
        id: 1,
        taskName: "Task 1",
        color: "green",
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
  },
  {
    id: 2,
    name: "Marah Lauriano",
    tasks: [
      null,
      {
        id: 1,
        taskName: "Task 1",
        color: "green",
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
  },
  {
    id: 3,
    name: "Nics Gonzales",
    tasks: [
      null,
      null,
      {
        id: 1,
        taskName: "Task 1",
        color: "green",
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
  },
];

export const DemoProvider = ({ children }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [userList, setUserList] = useState(baseUserList);

  const taskList = [
    {
      id: 1,
      taskName: "Task 1",
      color: "green",
    },
    {
      id: 2,
      taskName: "Task 2",
      color: "blue",
    },
    {
      id: 3,
      taskName: "Task 3",
      color: "red",
    },
  ];

  return (
    <DemoContext.Provider
      value={{ taskList, selectedTask, setSelectedTask, userList, setUserList }}
    >
      {children}
    </DemoContext.Provider>
  );
};
