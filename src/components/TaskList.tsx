import { useTasksContext } from "../contex/TasksContex";
import { Container, WhiteDiv } from "../styles/taskListStyles";
import Task from "./Task";

/**
 * TaskList component displays a list of tasks.
 */
const TaskList = () => {
    const { tasks, loading, error } = useTasksContext()

    return ( 
        <Container>
            {tasks && tasks.map((desc, i) => 
                (<Task key={`${i}${desc}`} index={i} desc={desc}/>))
            }       
            {loading && <WhiteDiv>Loading...</WhiteDiv>}
            {error && <WhiteDiv>{ error }</WhiteDiv>}
        </Container> 
    );
}
 
export default TaskList;