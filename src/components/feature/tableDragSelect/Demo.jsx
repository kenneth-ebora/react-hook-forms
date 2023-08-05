import { useContext, useState } from "react";
import { TableDragSelect } from "./TableDragSelect";
import moment from "moment-timezone";

import "./Demo.css";
import TaskList from "./TaskList";
import { DemoContext } from "./DemoContext";

export const Demo = () => {
  const { userList, setUserList, selectedTask } = useContext(DemoContext);

  // const initialCells = [
  //   [false, false, false, false, false, false, false],
  //   [false, false, false, false, false, false, false],
  //   [false, false, false, false, false, false, false],
  //   [false, false, false, false, false, false, false],
  //   [false, false, false, false, false, false, false],
  //   [false, false, false, false, false, false, false],
  //   [false, false, false, false, false, false, false],
  //   [false, false, false, false, false, false, false],
  // ];

  // const [cells, setCells] = useState(initialCells);

  const handleChange = (newCells) => {
    setUserList(newCells);
  };

  const handleReset = () => {
    // setCells(initialCells);
  };

  const renderCells = () => {
    return userList.map((userTask) => (
      <tr key={userList.id}>
        <td className="name-cell" disabled>
          {userTask.name}
        </td>
        {userTask.tasks.map((task, index) => {
          if (task) {
            return (
              <td
                key={task.id}
                style={{ background: task.color, color: "white" }}
              >
                {task?.taskName}
              </td>
            );
          }

          return <td key={index} />;
        })}
      </tr>
    ));
  };

  const renderHeaders = () => {
    // initialize with header for names
    const daysInMonth = [];
    const totalDays = moment().daysInMonth();

    for (let x = 0; x <= totalDays; x++) {
      daysInMonth.push(x);
    }

    return (
      <tr>
        <td className="name-cell">Names</td>
        {daysInMonth.slice(0, 10).map((day) => (
          <th disabled key={`day${day}`}>
            {day}
          </th>
        ))}
      </tr>
    );
  };

  const renderCountCells = () => {
    let countCells = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    userList.forEach((userTask) => {
      for (let dayNumber = 0; dayNumber <= userTask.tasks.length; dayNumber++) {
        if (userTask.tasks[dayNumber]) {
          countCells[dayNumber]++;
        }
      }
    });

    return (
      <tr>
        <td className="name-cell">Count:</td>
        {countCells.map((cell, index) => (
          <td key={index}>{cell}</td>
        ))}
      </tr>
    );
  };

  return (
    <div>
      <TaskList />

      <table className="table-drag-select">
        <tbody>{renderCountCells()}</tbody>
        <tbody>{renderHeaders()}</tbody>
      </table>
      <table className="table-drag-select">
        <TableDragSelect
          value={userList}
          selectedTask={selectedTask}
          onChange={handleChange}
        >
          {renderCells()}
        </TableDragSelect>
      </table>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Demo;
