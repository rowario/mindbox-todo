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
import { useTasksStyles } from "../hooks/useTasksStyles";

const filters = {
    all: (_: Task) => true,
    active: (task: Task) => !task.completed,
    completed: (task: Task) => task.completed,
};

type Filter = keyof typeof filters;

const TasksList: FC = () => {
    const [input, setInput] = useState("");
    const [filter, setFilter] = useState<Filter>("all");

    const { tasks, dispatch } = useContext(TasksContext);

    const styles = useTasksStyles();

    const completedCount = tasks.filter((x) => x.completed).length;
    const activeCount = tasks.length - completedCount;

    const filteredTasks = tasks.filter(filters[filter]);

    const handleAdd = () => {
        if (input.trim().length > 0) {
            setInput("");
            dispatch({ type: "ADD_TASK", payload: input });
        }
    };

    const handleClear = () => {
        dispatch({ type: "CLEAR_COMPLETED_TASKS" });
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
                    <Paper className={styles.tasksPaper} elevation={1}>
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
                        <FormGroup className={styles.tasksList}>
                            {filteredTasks.length < 1 && (
                                <Typography align="center" color="gray">
                                    There are no tasks
                                </Typography>
                            )}
                            {filteredTasks.map((task) => (
                                <FormControlLabel
                                    className={
                                        task.completed
                                            ? styles.completedTask
                                            : undefined
                                    }
                                    key={task.id}
                                    label={task.name}
                                    checked={task.completed}
                                    control={
                                        <Checkbox
                                            onChange={() =>
                                                handleToggle(task.id)
                                            }
                                        />
                                    }
                                />
                            ))}
                        </FormGroup>
                        {tasks.length > 0 && (
                            <Box className={styles.filters}>
                                <Box>
                                    <Typography color="gray" fontSize={12}>
                                        {activeCount} items left
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
                                        disabled={completedCount < 1}
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
