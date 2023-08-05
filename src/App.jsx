import { Container, Stack } from "@mui/material";
import "./App.css";
import UserList from "./components/feature/users/UserList";
import Navbar from "./components/layout/Navbar";
import CustomThemeProvider from "./components/layout/ThemeProvider/ThemeProvider";
import Main from "./components/layout/Main/Main";
import { Demo } from "./components/feature/tableDragSelect/Demo";
import { DemoProvider } from "./components/feature/tableDragSelect/DemoContext";

function App() {
  return (
    <CustomThemeProvider>
      <Main>
        <Navbar />
        <Container>
          <DemoProvider>
            <Demo />
          </DemoProvider>
        </Container>
      </Main>
    </CustomThemeProvider>
  );
}

export default App;
