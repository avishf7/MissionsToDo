import TaskListHead from "../components/TaskListHead";
import TaskList from "../components/TaskList";
import { TasksProvider } from "../contex/TasksContex";

/**
 * Home component serves as the main view of the application.
 * It wraps TaskListHead and TaskList components with TasksProvider to manage tasks data.
 */
const Home = () => {    
    return ( 
        <TasksProvider>
            <TaskListHead/>
            <TaskList/>
        </TasksProvider>
     );
}
 
export default Home;