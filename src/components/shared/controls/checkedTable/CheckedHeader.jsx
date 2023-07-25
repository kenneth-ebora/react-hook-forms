/* eslint-disable react/prop-types */
import CheckedRow from "./CheckedRow";

const CheckedHeader = ({ children, isChecked, onChange }) => {
  return (
    <CheckedRow isChecked={isChecked} onChange={onChange}>
      {children}
    </CheckedRow>
  );
};

export default CheckedHeader;
