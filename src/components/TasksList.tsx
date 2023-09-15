import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    FormGroup,
    Grid,
    Paper,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import { FC, useContext, useState } from "react";
import { TasksContext } from "../contexts/TasksContextProvider";
import { Task } from "../types/Task";

const filters = {
    all: (task: Task) => task,
    active: (task: Task) => !task.completed,
    completed: (task: Task) => task.completed,
};

type Filter = keyof typeof filters;

const TasksList: FC = () => {
    const [input, setInput] = useState("");
    const [filter, setFilter] = useState<Filter>("all");
    const { tasks, dispatch } = useContext(TasksContext);

    const tasksDone = tasks.filter((x) => x.completed).length;

    const filteredTasks = tasks.filter(filters[filter]);

    const handleAdd = () => {
        setInput("");
        dispatch({ type: "ADD_TASK", payload: input });
    };

    const handleClear = () => {
        dispatch({ type: "CLEAR_DONE_TASKS" });
    };

    const handleToggle = (taskId: string) => {
        dispatch({ type: "TOGGLE_TASK", payload: taskId });
    };

    const handleFilterChange = (
        _: React.MouseEvent<HTMLElement>,
        value: string
    ) => {
        setFilter(value as Filter);
    };

    return (
        <Container sx={{ paddingTop: 2 }}>
            <Grid container justifyContent={"center"}>
                <Grid item xl={7}>
                    <Paper
                        sx={{
                            padding: 2,
                        }}
                        elevation={1}
                    >
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleAdd();
                            }}
                        >
                            <TextField
                                onChange={(e) => {
                                    setInput(e.currentTarget.value);
                                }}
                                value={input}
                                fullWidth
                                label="What needs to be done?"
                                variant="outlined"
                            />
                        </form>
                        <FormGroup sx={{ mt: 2 }}>
                            {filteredTasks.length < 1 && (
                                <Typography align="center" color="gray">
                                    There are no tasks
                                </Typography>
                            )}
                            {filteredTasks.map((task) => (
                                <FormControlLabel
                                    key={task.id}
                                    sx={{
                                        textDecoration: task.completed
                                            ? "line-through"
                                            : "none",
                                        color: task.completed
                                            ? "gray"
                                            : "black",
                                    }}
                                    label={task.name}
                                    checked={task.completed}
                                    control={
                                        <Checkbox
                                            onChange={() => {
                                                handleToggle(task.id);
                                            }}
                                        />
                                    }
                                />
                            ))}
                        </FormGroup>
                        {tasks.length > 0 && (
                            <Box
                                pt={1}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    "& > div": {
                                        display: "flex",
                                        width: "33.3333333%",
                                    },
                                    "& > div:nth-of-type(1)": {
                                        justifyContent: "start",
                                    },
                                    "& > div:nth-of-type(2)": {
                                        justifyContent: "center",
                                    },
                                    "& > div:nth-of-type(3)": {
                                        justifyContent: "end",
                                    },
                                }}
                            >
                                <Box>
                                    <Typography color="gray" fontSize={12}>
                                        {
                                            tasks.filter((x) => !x.completed)
                                                .length
                                        }{" "}
                                        items left
                                    </Typography>
                                </Box>
                                <Box>
                                    <ToggleButtonGroup
                                        exclusive
                                        onChange={handleFilterChange}
                                        size="small"
                                        value={filter}
                                    >
                                        <ToggleButton value="all">
                                            All
                                        </ToggleButton>
                                        <ToggleButton value="active">
                                            Active
                                        </ToggleButton>
                                        <ToggleButton value="completed">
                                            Completed
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </Box>
                                <Box>
                                    <Button
                                        disabled={tasksDone < 1}
                                        onClick={handleClear}
                                        variant="text"
                                        size="small"
                                    >
                                        Clear completed
                                    </Button>
                                </Box>
                            </Box>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default TasksList;
