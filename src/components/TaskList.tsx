import { useTasksContext } from "../contex/TasksContex";
import { Container, WhiteDiv } from "../styles/taskListStyles";
import { TaskData } from "../utils/types";
import Task from "./Task";

/**
 * TaskList component displays a list of tasks.
 * It fetches tasks from the tasks context and renders each task using the Task component.
 * It also shows loading and error messages when applicable.
 */
const TaskList = () => {
    const { tasks, loading, error } = useTasksContext()

    return ( 
        <Container>
            {tasks && tasks.map((task : TaskData, i) => 
                (<Task key={`${i}${task.desc}`} index={i} task={task}/>))
            }       
            {loading && <WhiteDiv>Loading...</WhiteDiv>}
            {error && <WhiteDiv>{ error }</WhiteDiv>}
        </Container> 
    );
}
 
export default TaskList;