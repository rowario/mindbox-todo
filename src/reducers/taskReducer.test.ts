import { act, renderHook, waitFor } from "@testing-library/react";
import { taskReducer } from "./taskReducer";
import { useReducer } from "react";
import { Task } from "../types/Task";

const mockTasks: Task[] = [
    {
        id: "1",
        name: "задача 1",
        completed: true,
    },
    {
        id: "2",
        name: "задача 2",
        completed: false,
    },
    {
        id: "2",
        name: "задача 2",
        completed: false,
    },
];

describe("task reducer", () => {
    test("add tasks", () => {
        const hook = renderHook(() => useReducer(taskReducer, mockTasks));
        const [tasks, dispatch] = hook.result.current;

        act(() => dispatch({ type: "ADD_TASK", payload: "задача 4" }));

        waitFor(() => {
            expect(tasks.length).toEqual(4);
        });
    });

    test("toggle task", () => {
        const hook = renderHook(() => useReducer(taskReducer, mockTasks));
        const [tasks, dispatch] = hook.result.current;

        act(() => dispatch({ type: "TOGGLE_TASK", payload: tasks[0].id }));

        waitFor(() => {
            expect(tasks.filter((x) => x.completed).length).toEqual(0);
        });
    });

    test("clear completed tasks", () => {
        const hook = renderHook(() => useReducer(taskReducer, mockTasks));
        const [tasks, dispatch] = hook.result.current;

        act(() => dispatch({ type: "CLEAR_COMPLETED_TASKS" }));

        waitFor(() => {
            expect(tasks.length).toEqual(2);
        });
    });
});
