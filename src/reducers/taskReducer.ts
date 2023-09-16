import { Task } from "../types/Task";

type AddTodoAction = {
	type: "ADD_TASK";
	payload: string;
};

type DeleteTodoAction = {
	type: "CLEAR_COMPLETED_TASKS";
};

type ToggleTodoAction = {
	type: "TOGGLE_TASK";
	payload: string;
};

export type TaskReducerAction = AddTodoAction | DeleteTodoAction | ToggleTodoAction;

export const taskReducer = (state: Task[], action: TaskReducerAction) => {
	switch (action.type) {
		case "ADD_TASK":
			return [
				{
					id: (99999999 * Math.random()).toString(),
					name: action.payload,
					completed: false,
				},
				...state,
			];
		case "CLEAR_COMPLETED_TASKS":
			return state.filter((task) => !task.completed);
		case "TOGGLE_TASK":
			return state.map((task) => {
				if (task.id === action.payload) {
					return { ...task, completed: !task.completed };
				}
				return task;
			});
		default:
			return state;
	}
};
