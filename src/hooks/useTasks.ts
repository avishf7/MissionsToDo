import React, { useEffect, useState } from "react"
import { useAuthStateContext } from "../contex/AuthContext"
import { getAllFirebaseTasks } from "../firebase/api"
import { TaskData } from "../utils/types"

type UseTaskResult = {
    tasks: TaskData[],
    setTasks: React.Dispatch<React.SetStateAction<TaskData[]>>,
    loading: boolean,
    error: string,
}

/**
 * Hook for managing tasks state and interacting with Firestore.
 * Fetches tasks from Firestore on mount and provides state and error handling.
 *
 * @returns An object containing:
 * - `tasks`: The current list of tasks.
 * - `setTasks`: Function to update the list of tasks.
 * - `loading`: Boolean indicating if tasks are being fetched.
 * - `error`: Error message, if any occurred during fetch.
 */
export const useTasks = (): UseTaskResult => {
        const { username } = useAuthStateContext()
        const [ tasks, setTasks ] = useState<TaskData[]>([])
        const [ loading, setLoding ] = useState<boolean>(false)
        const [ error, setError ] = useState<string>("")

        /**
         * Fetches tasks from Firestore on mount or when `username` changes.
         * Sets `loading` to true during fetch and updates `tasks` or `error` based on the result.
         * Cleans up by aborting the fetch if the component unmounts.
         */
        useEffect(() => {
            const abortCtr = new AbortController()

            setLoding(true)

            getAllFirebaseTasks(username)
            .then(tasks => {
                setLoding(false)
                setTasks(tasks)
                setError("")
            })
            .catch((err: Error ) => {
                setLoding(false)
                setError(err.message)
            })
    
            return () => abortCtr.abort()
        }, [])




        return { tasks, setTasks, loading, error }
}