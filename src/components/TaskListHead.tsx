import { useAuthStateContext } from "../contex/AuthContext";
import { Button, Container, Header } from "../styles/taskListHeadStyles";
import AddTaskForm from "./AddTaskForm";

/**
 * TaskListHead component displays the header and logout button for task list.
 */
const TaskListHead = () => {
const { username, logout } = useAuthStateContext()

    return ( 
        <Container>
            <Header>Missions To Do For - {username}</Header>
            <Button onClick={() => logout()}>logout</Button>
            <AddTaskForm/>
        </Container>

     );
}
 
export default TaskListHead;