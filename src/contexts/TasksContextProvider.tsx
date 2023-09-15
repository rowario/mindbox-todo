import { FC, ReactNode, createContext, useReducer } from "react";
import { Task } from "../types/Task";
import { TaskReducerAction, taskReducer } from "../reducers/taskReducer";

type TasksContextModel = {
    tasks: Task[];
    dispatch: React.Dispatch<TaskReducerAction>;
};

export const TasksContext = createContext<TasksContextModel>(
    {} as TasksContextModel
);

const TasksContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [tasks, dispatch] = useReducer(taskReducer, []);

    return (
        <TasksContext.Provider value={{ tasks, dispatch }}>
            {children}
        </TasksContext.Provider>
    );
};

export default TasksContextProvider;
