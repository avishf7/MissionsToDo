import { memo, useEffect, useState } from "react";
import { useTasksContext } from "../contex/TasksContex";
import { Button, Desc, Item } from "../styles/taskStyles";
import { TaskData } from "../utils/types";

type taskProps = {
    index: number,
    task: TaskData
}

/**
 * Task component displays a single task item with a remove button.
 * It allows toggling the task's completion status and removing the task.
 *
 * @param props.index - Index of the task in the tasks list.
 * @param props.task - The task data, including description and completion status.
 */
const Task = (props : taskProps) => {
    const { removeTask, checkTask, tasks } = useTasksContext()
    const [ updateLoading, setUpdateLoading] = useState<boolean>(false)

    /**
     * Handles clicking on the task description.
     * Toggles the completion status of the task.
     */
    function handleDescClick(): void {
        if( !updateLoading ){
            setUpdateLoading(true)
            checkTask(props.index)
        }
    }

    /**
     * Handles clicking on the remove button.
     * Removes the task from the tasks list.
     */
    function handleButtonClick(): void {
        if( !updateLoading ){
            setUpdateLoading(true)
            removeTask(props.index)
        }
    }

    /**
     * Resets the loading state when tasks are updated.
     * This effect runs whenever the `tasks` dependency changes.
     */
    useEffect( () => {
        if( updateLoading )
            setUpdateLoading(false)
    }, [tasks])

    return ( 
        <Item>
            <Desc $updateLoading={updateLoading} $isCompleted={props.task.isCompleted} onClick={handleDescClick}>
                { props.task.desc }
            </Desc>
            <Button $updateLoading={updateLoading} onClick={handleButtonClick}>✕</Button>
        </Item>
     );
}

// Memoize Task component for performance optimization
export default memo(Task); 