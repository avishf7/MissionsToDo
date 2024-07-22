import { FormEvent, useState } from "react";
import { useAuthStateContext } from "../contex/AuthContext";
import { FormButton, Form, FormInput } from "../styles/loginStyles";

/**
 * Login component renders a form for user login.
 * Uses useAuthStateContext to access login function from AuthContext for authentication.
 */
const Login = () => {
    const { login } = useAuthStateContext()
    const [ inputUsername, setInputUsername ] = useState<string>("")

    /**
     * Handles form submission for user login.
     * Prevents default form submission behavior and extracts username from form data.
     * Triggers login function with lowercased username for authentication.
     * @param e FormEvent<HTMLFormElement> event object representing form submission.
     */
    const handleUsernameSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Extract username from form data and trigger login function
        const username = new FormData(e.currentTarget).get('username') as string
        login(username.toLowerCase());
    }
        return ( 
            <Form onSubmit={handleUsernameSubmit}>
                <FormInput placeholder="username"
                            value={inputUsername}
                            onChange={e => setInputUsername(e.target.value.trim())}
                            type="text" 
                            name="username"
                            required/>
                <FormButton>login</FormButton>
            </Form>
     );
}
 
export default Login;