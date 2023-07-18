import { Container, Stack } from "@mui/material";
import "./App.css";
import UserList from "./components/feature/users/UserList";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <Stack>
      <Navbar />
      <Container>
        <UserList />
      </Container>
    </Stack>
  );
}

export default App;
