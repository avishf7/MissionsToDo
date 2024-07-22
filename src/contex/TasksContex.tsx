import { createContext, ReactNode, useContext } from "react"
import { useTasks } from "../hooks/useTasks"
import { setFirebaseTasks } from "../firebase/api"
import { useAuthStateContext } from "./AuthContext"

// Type for tasks context data
type TasksContextData = {
    tasks: string[],
    loading: boolean,
    error: string,
    addTask: (task: string) => void,
    removeTask: (idToeRemove: number) => void
}

const TasksContext = createContext<TasksContextData | undefined>(undefined)

/**
 * TasksProvider component manages tasks state and provides addTask and removeTask functionalities.
 * @param props.children ReactNode containing child components wrapped by TasksProvider.
 */
export const TasksProvider = (props : { children : ReactNode }) => {
    const { username } = useAuthStateContext()
    const { tasks, setTasks, loading, error } = useTasks()

    /**
     * Function to add a new task.
     * @param task New task to be added.
     */
    const addTask = (task : string) => {
        const newTasks = [...tasks, task]
        setFirebaseTasks(username, newTasks)
        .then(() => setTasks(newTasks))
        .catch(() => alert("ERROR: failed to add a new task"))
    }

    /**
     * Function to remove a task.
     * @param idToRemove Index of the task to remove.
     */
    const removeTask = (idToRemove : number) => {
        const newTasks = tasks.filter((_, i) => i !== idToRemove)
        setFirebaseTasks(username, newTasks)
        .then(() => setTasks(newTasks))
        .catch(() => alert("ERROR: failed to remove a task"))
    }

    // Render TasksContext.Provider with tasks context data
    return (
        <TasksContext.Provider value={{
            tasks,
            loading,
            error,
            addTask,
            removeTask
        }}>
            {props.children}
        </TasksContext.Provider>
    )
}

/**
 * Custom hook to access TasksContext data.
 * @returns TasksContextData containing tasks, loading, error, addTask, and removeTask functions.
 * @throws Error if used outside of a TasksProvider.
 */
export const useTasksContext: () => TasksContextData = () => {
    const tasksContext = useContext(TasksContext)

    if (!tasksContext) {
        throw new Error("TaskContex must be within a TaskProvider")
    }

    return tasksContext
}