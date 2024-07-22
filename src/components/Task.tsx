import { memo } from "react";
import { useTasksContext } from "../contex/TasksContex";
import { Button, Item } from "../styles/taskStyles";

type taskProps = {
    index: number,
    desc: string
}

/**
 * Task component displays a single task item with a remove button.
 * @param index - Index of the task
 * @param desc - Description of the task
 */
const Task = (props : taskProps) => {
    const { removeTask } = useTasksContext()

    return ( 
        <Item>
            <div>{ props.desc }</div>
            <Button onClick={() => removeTask(props.index)}>✕</Button>
        </Item>
     );
}

// Memoize Task component for performance optimization
export default memo(Task); 