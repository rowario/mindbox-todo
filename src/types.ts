export type Task = {
	id: string;
	name: string;
	completed: boolean;
};

export type AddTodoAction = {
	type: "ADD_TASK";
	payload: string;
};

export type DeleteTodoAction = {
	type: "CLEAR_COMPLETED_TASKS";
};

export type ToggleTodoAction = {
	type: "TOGGLE_TASK";
	payload: string;
};

export type LoadStorageAction = {
	type: "LOAD_STORAGE";
};

export type TaskReducerAction = AddTodoAction | DeleteTodoAction | ToggleTodoAction | LoadStorageAction;

export type TasksContextModel = {
	tasks: Task[];
	dispatch: React.Dispatch<TaskReducerAction>;
};
