/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

export const TableDragSelect = (props) => {
  const [selectionStarted, setSelectionStarted] = useState(false);
  const [startRow, setStartRow] = useState(null);
  const [startColumn, setStartColumn] = useState(null);
  const [endRow, setEndRow] = useState(null);
  const [endColumn, setEndColumn] = useState(null);

  useEffect(() => {
    const handleTouchEndWindow = (e) => {
      const isLeftClick = e.button === 0;
      const isTouch = e.type !== "mousedown";
      if (selectionStarted && (isLeftClick || isTouch)) {
        const value = [...props.value];
        const minRow = Math.min(startRow, endRow);
        const maxRow = Math.max(startRow, endRow);
        for (let row = minRow; row <= maxRow; row++) {
          const minColumn = Math.min(startColumn, endColumn);
          const maxColumn = Math.max(startColumn, endColumn);

          for (let column = minColumn; column <= maxColumn; column++) {
            value[row].tasks[column] = props.selectedTask;
          }
        }
        setSelectionStarted(false);
        props.onChange(value);
      }
    };

    window.addEventListener("mouseup", handleTouchEndWindow);
    window.addEventListener("touchend", handleTouchEndWindow);

    return () => {
      window.removeEventListener("mouseup", handleTouchEndWindow);
      window.removeEventListener("touchend", handleTouchEndWindow);
    };
  }, [selectionStarted, startRow, endRow, startColumn, endColumn, props]);

  const handleTouchStartCell = (e) => {
    const isLeftClick = e.button === 0;
    const isTouch = e.type !== "mousedown";
    if (!selectionStarted && (isLeftClick || isTouch)) {
      e.preventDefault();
      const { row, column } = eventToCellLocation(e);
      setSelectionStarted(true);
      setStartRow(row);
      setStartColumn(column);
      setEndRow(row);
      setEndColumn(column);
      // setAddMode(!props.value[row][column]);
    }
  };

  const handleTouchMoveCell = (e) => {
    if (selectionStarted) {
      e.preventDefault();
      const { row, column } = eventToCellLocation(e);
      if (endRow !== row || endColumn !== column) {
        setEndRow(row);
        setEndColumn(column);
      }
    }
  };

  const renderRows = () => {
    return React.Children.map(props.children, (tr, i) => {
      return (
        <tr key={i} {...tr.props}>
          {React.Children.map(tr.props.children, (cell, j) => {
            return (
              <Cell
                key={j}
                onTouchStart={handleTouchStartCell}
                onTouchMove={handleTouchMoveCell}
                task={props.value[i].tasks[j - 1]}
                beingSelected={isCellBeingSelected(i, j - 1)}
                {...cell.props}
              >
                {cell.props.children}
              </Cell>
            );
          })}
        </tr>
      );
    });
  };

  const isCellBeingSelected = (row, column) => {
    const minRow = Math.min(startRow, endRow);
    const maxRow = Math.max(startRow, endRow);
    const minColumn = Math.min(startColumn, endColumn);
    const maxColumn = Math.max(startColumn, endColumn);
    return (
      selectionStarted &&
      row >= minRow &&
      row <= maxRow &&
      column >= minColumn &&
      column <= maxColumn
    );
  };

  return <tbody>{renderRows()}</tbody>;
};

const Cell = (props) => {
  const tdRef = useRef(null);

  const handleTouchStart = (e) => {
    if (!props.disabled) {
      props.onTouchStart(e);
    }
  };

  const handleTouchMove = (e) => {
    if (!props.disabled) {
      props.onTouchMove(e);
    }
  };

  let {
    className = "",
    disabled,
    beingSelected,
    onTouchStart,
    onTouchMove,
    task,
    ...otherProps
  } = props;

  let style = task ? { background: task.color, color: "white" } : {};

  if (disabled) {
    className += " cell-disabled";
  } else {
    className += " cell-enabled";

    if (beingSelected) {
      className += " cell-being-selected";
    }
  }

  return (
    <td
      ref={tdRef}
      className={className}
      style={style}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      {...otherProps}
    >
      {props.children || <span>&nbsp;</span>}
    </td>
  );
};

// Takes a mouse or touch event and returns the corresponding row and cell.
// Example:
//
// eventToCellLocation(event);
// {row: 2, column: 3}
const eventToCellLocation = (e) => {
  let target;
  target = e.target;
  while (target.tagName !== "TD") {
    target = target.parentNode;
  }

  return {
    row: target.parentNode.rowIndex,
    column: target.cellIndex - 1,
  };
};
