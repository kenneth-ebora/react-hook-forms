import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Paper,
  Stack,
  TableCell,
  Typography,
} from "@mui/material";
import { useState } from "react";
import UserForm from "./components/UserForm";
import CheckedTable from "../../shared/controls/checkedTable/checkedTable";
import CheckedRow from "../../shared/controls/checkedTable/CheckedRow";
import { useCheckedTable } from "../../shared/controls/checkedTable/useCheckedTable";

const userList = [
  {
    id: 1,
    firstName: "Kenneth Gabrielle",
    lastName: "Ebora",
    isActive: true,
    role: {
      id: 1,
      roleName: "Admin",
    },
    isChecked: false,
  },
  {
    id: 2,
    firstName: "Charles",
    lastName: "White",
    isActive: false,
    role: {
      id: 1,
      roleName: "Admin",
    },
    isChecked: false,
  },
  {
    id: 3,
    firstName: "Kaya",
    lastName: "Orsan",
    isActive: true,
    role: {
      id: 2,
      roleName: "Viewer",
    },
    isChecked: false,
  },
];

const UserList = () => {
  const {
    dataList: finalUserList,
    isAllChecked,
    onCheckAll,
    onCheck,
  } = useCheckedTable(userList);
  const [isAddModalOpened, setIsAddModalOpened] = useState(false);

  const handleClose = () => setIsAddModalOpened(false);

  const renderTable = () => {
    return (
      <CheckedTable
        tableHead={
          <CheckedRow
            component="th"
            isChecked={isAllChecked}
            onChange={onCheckAll}
          >
            <TableCell component="th">First Name</TableCell>
            <TableCell component="th">Last Name</TableCell>
            <TableCell component="th">Status</TableCell>
            <TableCell component="th">Role</TableCell>
            <TableCell component="th" />
          </CheckedRow>
        }
        tableBody={finalUserList.map((user, index) => (
          <CheckedRow
            key={user.id}
            component="td"
            isChecked={user.isChecked}
            onChange={(checked) => onCheck(index, checked)}
          >
            <TableCell component="td">{user.firstName}</TableCell>
            <TableCell component="td">{user.lastName}</TableCell>
            <TableCell component="td">{user.isActive ? "Yes" : "No"}</TableCell>
            <TableCell component="td">{user.role.roleName}</TableCell>
            <TableCell>
              {/* <IconButton
                aria-label="chevron"
                onClick={() => {
                  if (isCollapsed) {
                    setCollapsedIndices((current) => {
                      return current.filter((exIndex) => exIndex !== index);
                    });
                  } else {
                    setCollapsedIndices((current) => {
                      current.push(index);
                      return [...current];
                    });
                  }
                }}
              >
                <KeyboardArrowDownIcon />
              </IconButton> */}
            </TableCell>
          </CheckedRow>
        ))}
      />
    );
  };

  return (
    <>
      <Stack sx={{ alignItems: "flex-start", gap: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography component="h1" sx={{ fontSize: "24px" }}>
            User List
          </Typography>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setIsAddModalOpened(true)}
          >
            Add New
          </Button>
        </Box>
        <Paper elevation={2} sx={{ width: "100%" }}>
          {renderTable()}
        </Paper>
      </Stack>
      <Dialog
        open={isAddModalOpened}
        onClose={handleClose}
        maxWidth="lg"
        scroll="body"
      >
        <DialogTitle>Subscribe</DialogTitle>
        <UserForm handleClose={handleClose} />
      </Dialog>
    </>
  );
};

export default UserList;
