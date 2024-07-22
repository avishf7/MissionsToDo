import { ChangeEvent, FormEvent, useState } from "react";
import { useTasksContext } from "../contex/TasksContex";
import { AddButton, Form, FormInput } from "../styles/addTaskFormStyle";

/**
 * Component for adding a new task.
 */
const AddTaskForm = () => {
    const { addTask } = useTasksContext()
    const [ desc , setDesc] = useState<string>("")

    /**
     * Handles form submission to add a new task.
     */
    function handleTaskSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault()

        addTask(desc)          
        setDesc("") // Clear input field

    }

    /**
     * Handles input change for task description.
     */
    function inputOnChangeHandler(e: ChangeEvent<HTMLInputElement>): void {
        let inputValue = e.target.value;
        inputValue = inputValue.trim() ? inputValue : ""

        setDesc(inputValue)
    }
    
    return (
        <Form onSubmit={handleTaskSubmit}>
            <FormInput value={desc} onChange={inputOnChangeHandler} placeholder="Description..." required/>
            <AddButton>Add</AddButton>
        </Form>
      );
}
 
export default AddTaskForm;