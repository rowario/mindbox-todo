import { Task, TaskReducerAction } from "../types";

const storageName = "mindboxTodo";

export const taskReducer = (state: Task[], action: TaskReducerAction) => {
	let newState = state;

	switch (action.type) {
		case "ADD_TASK":
			newState = [
				{
					id: (99999999 * Math.random()).toString(),
					name: action.payload,
					completed: false,
				},
				...state,
			];
			break;
		case "CLEAR_COMPLETED_TASKS":
			newState = state.filter((task) => !task.completed);
			break;
		case "TOGGLE_TASK":
			newState = state.map((task) => {
				if (task.id === action.payload) {
					return { ...task, completed: !task.completed };
				}
				return task;
			});
			break;
		case "LOAD_STORAGE":
			newState = JSON.parse(localStorage.getItem(storageName) ?? "[]");
			break;
	}

	localStorage.setItem(storageName, JSON.stringify(newState));

	return newState;
};
