import axios from "axios";

export class ToDoListService{

    static url = 'http://localhost:5000/ToDoList';

    //Fetch To-Do list
    static async getToDoListDetails() {
        try {
            const response = await axios.get(this.url);
            return response.data;
        } catch (error) {
            console.error("Error fetching To-Do list:", error);
            throw error;
        }
      }

    // Add a new To-Do item
    static async addToDoList(data) {
        try {
            const response = await axios.post(this.url, data);
            return response.data;
        } catch (error) {
            console.error("Error adding To-Do item:", error);
            throw error;
        }
    }

    // Remove a To-Do item
    static async removeToDoList(toDoItemId) {
        try {
            const response = await axios.delete(`${this.url}/${toDoItemId}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting To-Do item:", error);
            throw error;
        }
    }

    // Toggle To-Do item (update)
    static async toggleToDoList(updatedTodoItem) {
        try {
            const response = await axios.put(`${this.url}/${updatedTodoItem.id}`, updatedTodoItem);
            return response.data;
        } catch (error) {
            console.error("Error updating task:", error);
            throw error;
        }
    }
}