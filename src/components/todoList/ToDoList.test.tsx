import React from 'react';
import '@testing-library/jest-dom'
import {screen, render, fireEvent, waitFor} from '@testing-library/react';
import ToDoList from './ToDoList';

describe('ToDoList component', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('should add a new todo item when user creates new task', async () => {
        render(<ToDoList/>);

        const inputElement = screen.getByPlaceholderText('Add your tasks here!');

        fireEvent.change(inputElement, {target: {value: 'New Task'}});
        fireEvent.click(screen.getByText('Add Task'));

        await waitFor(() => {
            expect(screen.getByText('New Task')).toBeInTheDocument();
        });
    });

    it('should delete a todo when the deleteTodo function is called', async () => {
        render(<ToDoList/>);

        fireEvent.change(screen.getByPlaceholderText('Add your tasks here!'), {
            target: {value: 'Task to delete'},
        });
        fireEvent.click(screen.getByText('Add Task'));
        fireEvent.click(screen.getByText('Delete'));

        await waitFor(() => {
            expect(screen.queryByText('Task to delete')).not.toBeInTheDocument();
        });
    });

    it('should toggle a todo as completed when the toggleComplete function is called', async () => {
        render(<ToDoList/>);

        fireEvent.change(screen.getByPlaceholderText('Add your tasks here!'), {
            target: {value: 'Task to toggle'},
        });
        fireEvent.click(screen.getByText('Add Task'));
        const checkboxElement = screen.getByRole('checkbox');
        fireEvent.click(checkboxElement);

        await waitFor(() => {
            expect(checkboxElement).toBeChecked();
        });
    });

    it('should edit a todo when the editTodo function is called', async () => {
        render(<ToDoList/>);

        fireEvent.change(screen.getByPlaceholderText('Add your tasks here!'), {
            target: {value: 'Task to edit'},
        });

        fireEvent.click(screen.getByText('Add Task'));
        fireEvent.click(screen.getByText('Edit'));

        fireEvent.change(screen.getByDisplayValue('Task to edit'), {
            target: {value: 'Task edited'},
        });

        fireEvent.click(screen.getByText('Finish Editing'));

        await waitFor(() => {
            expect(screen.getByText('Task edited')).toBeInTheDocument();
        });
    });

    it('reorders todos when dragging and dropping', async () => {
        render(<ToDoList/>);

        fireEvent.change(screen.getByPlaceholderText('Add your tasks here!'), {
            target: {value: 'Task 1'},
        });
        fireEvent.click(screen.getByText('Add Task'));
        fireEvent.change(screen.getByPlaceholderText('Add your tasks here!'), {
            target: {value: 'Task 2'},
        });
        fireEvent.click(screen.getByText('Add Task'));

        const firstTodo = screen.getByText('Task 1');
        const secondTodo = screen.getByText('Task 2');

        const dragStartEvent = new MouseEvent('dragstart', { bubbles: true });
        const dragEndEvent = new MouseEvent('dragend', { bubbles: true });

        fireEvent(firstTodo, dragStartEvent);
        fireEvent(secondTodo, dragEndEvent);

        await waitFor(() => {
            expect(screen.getByText('Task 2')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('Task 1')).toBeInTheDocument();
        });
    });



});