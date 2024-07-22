import React, { useEffect, useState } from "react"
import { useAuthStateContext } from "../contex/AuthContext"
import { getAllFirebaseTasks } from "../firebase/api"

type UseTaskResult = {
    tasks: string[],
    setTasks: React.Dispatch<React.SetStateAction<string[]>>,
    loading: boolean,
    error: string,
}

export const useTasks = (): UseTaskResult => {
        const { username } = useAuthStateContext()
        const [ tasks, setTasks ] = useState<string[]>([])
        const [ loading, setLoding ] = useState<boolean>(false)
        const [ error, setError ] = useState<string>("")

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