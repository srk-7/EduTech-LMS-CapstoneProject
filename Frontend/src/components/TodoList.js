import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';

function TodoList() {
    const [todoList, setTodoList] = useState([]);
    const [newTask, setNewTask] = useState("");

    // Handle adding a new task
    const handleAddTask = () => {
        if (newTask.trim()) {
            setTodoList([...todoList, { task: newTask, completed: false }]);
            setNewTask(""); // Clear the input after adding the task
        }
    };

    // Handle task completion
    const toggleTaskCompletion = (index) => {
        const updatedTasks = todoList.map((item, i) => 
            i === index ? { ...item, completed: !item.completed } : item
        );
        setTodoList(updatedTasks);
    };

    // Handle removing a task
    const handleRemoveTask = (index) => {
        const updatedTasks = todoList.filter((_, i) => i !== index);
        setTodoList(updatedTasks);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-10">
            <div className="flex items-center mb-4">
                <FontAwesomeIcon icon={faClipboardList} className="text-indigo-600 text-4xl mr-4" />
                <h2 className="text-2xl font-semibold text-indigo-600">To-Do List</h2>
            </div>

            <div className="flex items-center mb-4">
                <input 
                    type="text" 
                    value={newTask} 
                    onChange={(e) => setNewTask(e.target.value)} 
                    className="border border-gray-300 p-2 rounded-lg w-full mr-2" 
                    placeholder="Add a new task" 
                />
                <button 
                    onClick={handleAddTask} 
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                >
                    +
                </button>
            </div>

            <ul className="list-none">
                {todoList.map((item, index) => (
                    <li key={index} className="mb-2 flex items-center">
                        <input 
                            type="checkbox" 
                            checked={item.completed} 
                            onChange={() => toggleTaskCompletion(index)} 
                            className="mr-2"
                        />
                        <span className={item.completed ? "line-through text-gray-500" : ""}>
                            {item.task}
                        </span>
                        {item.completed && (
                            <button 
                                onClick={() => handleRemoveTask(index)} 
                                className="ml-auto text-red-600 text-sm"
                            >
                                Remove
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
