import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import SelectableTableRow from "../../shared/selectableTable/SelectableTableRow";
import SelectableTable from "../../shared/selectableTable/SelectableTable";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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
  },
];

const UserList = () => {
  const [isAddModalOpened, setIsAddModalOpened] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [collapsedIndices, setCollapsedIndices] = useState([]);

  const handleClose = () => setIsAddModalOpened(false);

  const onCheckRow = (selectedRows) => {
    const selectedUsers = selectedRows.map((index) => userList[index]);
  };

  useEffect(() => {
    renderTable();
  }, [isDisabled]);

  const renderTable = () => {
    return (
      <SelectableTable
        tableHead={
          <SelectableTableRow>
            <TableCell component="th">First Name</TableCell>
            <TableCell component="th">Last Name</TableCell>
            <TableCell component="th">Status</TableCell>
            <TableCell component="th">Role</TableCell>
            <TableCell component="th"></TableCell>
          </SelectableTableRow>
        }
        tableBody={userList.map((user, index) => {
          const isCollapsed = collapsedIndices.includes(index);

          return (
            <Fragment key={user.id}>
              <SelectableTableRow
                key={user.id}
                selectable
                checkboxProps={{ disabled: true }}
              >
                <TableCell component="td">{user.firstName}</TableCell>
                <TableCell component="td">{user.lastName}</TableCell>
                <TableCell component="td">
                  {user.isActive ? "Yes" : "No"}
                </TableCell>
                <TableCell component="td">{user.role.roleName}</TableCell>
                <TableCell>
                  <IconButton
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
                  </IconButton>
                </TableCell>
              </SelectableTableRow>
              <TableRow>
                <TableCell sx={{ p: 0, border: "none" }} colSpan={6}>
                  <Collapse in={isCollapsed}>
                    <Box
                      sx={{
                        padding: "1rem",
                        borderBottom: "1px solid #ddd",
                        background: "#efefef",
                      }}
                    >
                      More User Details
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </Fragment>
          );
        })}
        onCheckRow={onCheckRow}
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
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              setIsDisabled((current) => !current);
            }}
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
