/* eslint-disable react/prop-types */
import { Table, TableBody, TableHead } from "@mui/material";
import {
  cloneElement,
  createElement,
  createRef,
  useEffect,
  useRef,
  useState,
} from "react";
import SelectableTableRow from "./SelectableTableRow";

const SelectableRowType = createElement(SelectableTableRow).type;
const SelectableTable = ({ tableHead, tableBody, onCheckRow }) => {
  const headerRef = useRef();
  const [bodyRefs, setBodyRefs] = useState([]);

  useEffect(() => {
    setBodyRefs((bodyRefs) =>
      Array(tableBody.length)
        .fill()
        .map((_, i) => bodyRefs[i] || createRef())
    );
  }, []);

  useEffect(() => {
    if (bodyRefs.length > 0) {
      const isAllDisabled = bodyRefs.every((bodyRef) => {
        return bodyRef.current.isDisabled();
      });

      headerRef.current.disable(isAllDisabled);
    }
  }, [bodyRefs]);

  const onCheckHeader = async (isChecked) => {
    await bodyRefs.forEach((bodyRef) => {
      if (!bodyRef.current.isDisabled()) {
        bodyRef.current.check(isChecked);
      }
    });

    onSelectRow();
  };

  const onCheckBodyRow = () => {
    const isAllChecked = bodyRefs.every((bodyRef) => {
      return bodyRef.current.isDisabled() || bodyRef.current.isChecked();
    });

    headerRef.current.check(isAllChecked);
    onSelectRow();
  };

  const onSelectRow = () => {
    onCheckRow(
      bodyRefs
        .map((bodyRef, index) => {
          if (bodyRef.current.isChecked()) {
            return index;
          }
        })
        .filter((index) => index !== null && index !== undefined)
    );
  };

  const referencedHead = cloneElement(tableHead, {
    onSelect: onCheckHeader,
    ref: headerRef,
    ...tableHead.props,
  });

  const headerEl = createElement(TableHead, null, referencedHead);

  const referencedBody = tableBody.map((row, index) => {
    let targetSelectableRow = row;

    if (row.type !== SelectableRowType) {
      targetSelectableRow = row.props.children;

      // Check if multiple children to seek SelectableTableRow in children
      if (row.props.children.length) {
        const targetIndex = row.props.children.findIndex(
          (rowChild) => rowChild.type === SelectableRowType
        );
        const target = row.props.children[targetIndex];

        const referencedSelectableRow = createElement(SelectableTableRow, {
          onSelect: onCheckBodyRow,
          highlightOnSelect: true,
          ref: bodyRefs[index],
          ...target.props,
        });

        // Replace selectableTableRow with referencedSelectableRow
        targetSelectableRow = row.props.children.map((rowChild, index) => {
          if (index === targetIndex) {
            return referencedSelectableRow;
          }

          return rowChild;
        });

        return targetSelectableRow;
      }
    }

    return cloneElement(targetSelectableRow, {
      onSelect: onCheckBodyRow,
      highlightOnSelect: true,
      ref: bodyRefs[index],
      ...tableBody.props,
    });
  });

  const bodyEl = createElement(TableBody, null, referencedBody);

  return (
    <Table>
      {headerEl}
      {bodyEl}
    </Table>
  );
};

export default SelectableTable;
