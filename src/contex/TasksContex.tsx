import { createContext, ReactNode, useCallback, useContext } from "react"
import { useTasks } from "../hooks/useTasks"
import { setFirebaseTasks } from "../firebase/api"
import { useAuthStateContext } from "./AuthContext"
import { TaskData } from "../utils/types"

// Type for tasks context data
type TasksContextData = {
    tasks: TaskData[],
    loading: boolean,
    error: string,
    addTask: (desc: string) => void,
    removeTask: (idToeRemove: number) => void
    checkTask: (idToCheck: number) => void
}

const TasksContext = createContext<TasksContextData | undefined>(undefined)


/**
 * Provides tasks context to its children.
 * Manages the tasks state and provides functions to add, remove, and check tasks.
 *
 * @param props.children ReactNode containing child components wrapped by TasksProvider.
 */
export const TasksProvider = (props : { children : ReactNode }) => {
    const { username } = useAuthStateContext()
    const { tasks, setTasks, loading, error } = useTasks()

    /**
     * Updates the tasks in both Firebase and the local state.
     *
     * @param updateTasks - The new array of tasks to update.
     * @returns A promise that resolves when the tasks are successfully updated in Firebase and the local state.
     */
    const update = useCallback( (updateTasks: TaskData[]) => {
        return setFirebaseTasks(username, updateTasks)
            .then(() => setTasks(updateTasks))
    },[username])

    /**
     * Adds a new task to the tasks list.
     *
     * @param desc - The description of the new task.
     */
    const addTask = (desc : string) => {
        const updateTasks = [...tasks, {desc, isCompleted: false}]

        update(updateTasks)
        .catch(() => alert(`ERROR: failed to add a new task${desc}`))
    }

    /**
     * Removes a task from the tasks list.
     *
     * @param idToRemove - The index of the task to remove.
     */
    const removeTask = (idToRemove : number) => {
        const updateTasks = tasks.filter((_, i) => i !== idToRemove)

        update(updateTasks)
        .catch(() => alert(`ERROR: failed to remove a task${idToRemove}`))
    }

     /**
     * Toggles the completion status of a task.
     *
     * @param idToCheck - The index of the task to check/uncheck.
     */
    const checkTask = (idToCheck : number) => {
        const updateTasks = [...tasks] 
        updateTasks[idToCheck] = {
            ...tasks[idToCheck],
            isCompleted: !tasks[idToCheck].isCompleted
        }    

        update(updateTasks)
        .catch(() => alert(`ERROR: failed to toggle a task${idToCheck}`))
    }

    // Render TasksContext.Provider with tasks context data
    return (
        <TasksContext.Provider value={{
            tasks,
            loading,
            error,
            addTask,
            removeTask,
            checkTask
        }}>
            {props.children}
        </TasksContext.Provider>
    )
}

/**
 * Custom hook to access TasksContext data.
 * @returns TasksContextData.
 * @throws Error if used outside of a TasksProvider.
 */
export const useTasksContext: () => TasksContextData = () => {
    const tasksContext = useContext(TasksContext)

    if (!tasksContext) {
        throw new Error("TaskContex must be within a TaskProvider")
    }

    return tasksContext
}