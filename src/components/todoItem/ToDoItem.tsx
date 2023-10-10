import React, {useState} from 'react'
import './ToDoItem.css'

interface ToDoItemProps {
    task: {
        id: string;
        task: string;
        completed: boolean;
    };
    deleteTodo: (id: string) => void;
    editTodo: (id: string) => void;
    toggleComplete: (id: string) => void;
    taskNumber: number;
}

export function ToDoItem({task, deleteTodo, editTodo, toggleComplete, taskNumber}: ToDoItemProps) {
    const [isChecked, setIsChecked] = useState(task.completed);

    const handleCheckbox = () => {
        setIsChecked(!isChecked);
        toggleComplete(task.id);
    };

    return (
        <div className="Todo">
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckbox}
            />
            <p className="taskNumber">{taskNumber}.</p>
            <p className="taskText">{task.task}</p>
            <div>
                <button className="edit-button" onClick={() => editTodo(task.id)}>Edit</button>
                <button className="delete-button" onClick={() => deleteTodo(task.id)}>Delete</button>
            </div>
        </div>
    )
}

