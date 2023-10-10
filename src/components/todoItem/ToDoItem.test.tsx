import React from 'react';
import '@testing-library/jest-dom'
import {render, screen, fireEvent} from '@testing-library/react';
import {ToDoItem} from './ToDoItem';
describe('ToDoItem component', () => {

    const props = {
        task: {
            id: '1',
            task: 'Sample Task',
            completed: false,
        },
        deleteTodo : jest.fn(),
        editTodo : jest.fn(),
        toggleComplete : jest.fn(),
        taskNumber: 1
    };

    it('should render task text correctly', () => {
        render(<ToDoItem {...props}/>);
        const taskTextElement = screen.getByText(props.task.task);
        expect(taskTextElement).toBeInTheDocument();
    });

    it('should mark checkbox if clicked', () => {
        render(<ToDoItem {...props}/>);
        const checkboxElement = screen.getByRole('checkbox');
        fireEvent.click(checkboxElement);
        expect(props.toggleComplete).toHaveBeenCalledTimes(1);
        expect(checkboxElement).toBeChecked();
    });

    it('should call editTodo when Edit button is clicked', () => {
        render(<ToDoItem {...props}/>);
        const editButtonElement = screen.getByText('Edit');
        fireEvent.click(editButtonElement);
        expect(props.editTodo).toHaveBeenCalledTimes(1);
    });

    it('should call deleteTodo when Delete button is clicked', () => {
        render(<ToDoItem {...props}/>);
        const deleteButtonElement = screen.getByText('Delete');
        fireEvent.click(deleteButtonElement);
        expect(props.deleteTodo).toHaveBeenCalledTimes(1);
    });
});