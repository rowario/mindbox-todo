import { FC, ReactNode, createContext, useReducer } from "react";
import { taskReducer } from "../reducers/taskReducer";
import { TasksContextModel } from "../types";

export const TasksContext = createContext<TasksContextModel>({} as TasksContextModel);

// Решил использовать контекст, так-как в задании было сказано про использование ReactHooks
const TasksContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [tasks, dispatch] = useReducer(taskReducer, []);

	return <TasksContext.Provider value={{ tasks, dispatch }}>{children}</TasksContext.Provider>;
};

export default TasksContextProvider;
