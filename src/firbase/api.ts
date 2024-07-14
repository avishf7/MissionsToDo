import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "./config"

/**
 * Retrieves all tasks associated with the user from Firestore.
 * If user document does not exist, initializes it with an empty tasks array.
 * @param username Username of the authenticated user.
 * @returns Promise resolving to an array of tasks.
 * @throws Error if there's an issue fetching or initializing tasks.
 */
export const getAllFirebaseTasks = async (username: string): Promise<string[]> => {
    try {
        // Reference to user document in Firestore
        const userDocRef = doc(db, "users", username)
        // Fetch user document from Firestore
        const userDoc = await getDoc(userDocRef)

        if(!userDoc.exists()) {
            setDoc(userDocRef, { tasks: [] })
            return []
        } else {
            return userDoc.data()?.tasks 
        }
    } catch (err) {
        console.error(`Error fetching tasks: ${err}`)
        throw err
    }
}

/**
 * Updates tasks for the user in Firestore.
 * @param username Username of the authenticated user.
 * @param newTasks Updated tasks array to set in Firestore.
 * @throws Error if there's an issue updating tasks.
 */
export const setFirebaseTasks = async (username : string, newTasks: string[]) => {
    try {
        // Reference to user document in Firestore
        const userDocRef = doc(db, "users", username)
        // Update tasks array in user document
        await updateDoc(userDocRef, { tasks: newTasks })
        
    } catch(err) {
        console.error(`Error setting tasks: ${err}`)
        throw err
    }
}