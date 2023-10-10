import React, {useEffect, useState} from 'react';
import {v4 as uuid} from 'uuid';
import {ToDoItem} from "../todoItem/ToDoItem";
import {ToDoForm} from "../todoForm/ToDoForm";
import CompletionMeter from "../progressBar/ProgressBar";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import './ToDoList.css'

interface Todo {
    id: string;
    task: string;
    completed: boolean;
    isEditing: boolean;
    taskNumber: number;
}

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function ToDoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const completedCount = todos.filter((todo) => todo.completed).length;
    const totalTasks = todos.length;

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
        if (storedTodos.length > 0) {
            setTodos(storedTodos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    const addTodo = (todo: string) =>
        setTodos([...todos, {
            id: uuid(),
            task: todo,
            completed: false,
            isEditing: false,
            taskNumber: todos.length + 1
        }]);

    const deleteTodo = (id: string) => setTodos(todos.filter((todo) => todo.id !== id));

    const toggleComplete = (id: string) =>
        setTodos(todos.map((todo) => todo.id === id ? {...todo, completed: !todo.completed} : todo));

    const editTodo = (id: string) =>
        setTodos(todos.map((todo) => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo));

    const editTask = (task: string, id: string) =>
        setTodos(todos.map((todo) => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo));

    const onDragEnd = (result: any) => {
        if (!result.destination) return;

        const reorderedTodos = Array.from(todos);
        const [reorderedItem] = reorderedTodos.splice(result.source.index, 1);
        reorderedTodos.splice(result.destination.index, 0, reorderedItem);

        const updatedTodos = reorderedTodos.map((todo, index) => ({...todo, taskNumber: index + 1}));
        setTodos(updatedTodos);
    };

    return (
        <div className="TodoList">
            <h1>Task Checklist</h1>
            <ToDoForm addTodo={addTodo}/>
            {totalTasks > 0 &&
                <CompletionMeter
                    completedCount={completedCount}
                    totalTasks={totalTasks}
                />
            }
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="todos">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {todos.map((todo, index) =>
                                todo.isEditing ? (
                                    <ToDoForm key={todo.id} editTodo={editTask} task={todo} isEditing={true}/>
                                ) : (
                                    <Draggable key={todo.id} draggableId={todo.id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <ToDoItem
                                                    task={todo}
                                                    deleteTodo={deleteTodo}
                                                    editTodo={editTodo}
                                                    toggleComplete={toggleComplete}
                                                    taskNumber={todo.taskNumber}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            )}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default ToDoList;
