import "@fontsource/roboto/400.css";
import { CssBaseline } from "@mui/material";
import TasksList from "./components/TasksList";
import TasksContextProvider from "./contexts/TasksContextProvider";

function App() {
    return (
        <TasksContextProvider>
            <CssBaseline />
            <TasksList />
        </TasksContextProvider>
    );
}

export default App;
