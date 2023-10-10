import React from 'react';
import '@testing-library/jest-dom'
import {render, fireEvent, screen} from '@testing-library/react';
import {ToDoForm} from './ToDoForm';

describe('ToDoForm component', () => {

    it('should render the input form', () => {
        render(<ToDoForm/>);

        const inputElement = screen.getByPlaceholderText('Add your tasks here!');
        const addButton = screen.getByText('Add Task');

        expect(inputElement).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();
    });

    it('should call addTodo function when submitting a new task', () => {
        const addTodoMock = jest.fn();
        render(<ToDoForm addTodo={addTodoMock}/>);

        const inputElement = screen.getByPlaceholderText('Add your tasks here!');
        const addButton = screen.getByText('Add Task');

        fireEvent.change(inputElement, {target: {value: 'New Task'}});
        fireEvent.click(addButton);

        expect(addTodoMock).toHaveBeenCalledWith('New Task');
    });

    it('should call editTodo function when submitting an edited task', () => {
        const editTodoMock = jest.fn();
        render(<ToDoForm editTodo={editTodoMock} task={{id: '1', task: 'Edit Me'}}/>);

        const inputElement = screen.getByPlaceholderText('Add your tasks here!');
        const addButton = screen.getByText('Add Task');

        fireEvent.change(inputElement, {target: {value: 'Edited Task'}});
        fireEvent.click(addButton);

        expect(editTodoMock).toHaveBeenCalledWith('Edited Task', '1');
    });

    it('should not show error message if input is empty', () => {
        render(<ToDoForm/>);

        const addButton = screen.getByText('Add Task');

        fireEvent.click(addButton);

        const errorMessage = screen.getByText('Please input a task');

        expect(errorMessage).toBeInTheDocument();
    });

    it('limits the input value to 30 characters', () => {
        const addTodoMock = jest.fn();
        render(<ToDoForm addTodo={addTodoMock}/>);

        const inputElement = screen.getByPlaceholderText('Add your tasks here!');

        fireEvent.change(inputElement, {target: {value: 'This is a very long task description that exceeds the character limit'}});

        expect(inputElement).toHaveValue('This is a very long task description tha');
    });
});