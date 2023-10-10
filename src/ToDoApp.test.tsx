import React from 'react';
import {screen, render} from '@testing-library/react';
import '@testing-library/jest-dom'
import {ToDoApp} from './ToDoApp';

jest.mock('./components/todoList/ToDoList', () => {
    return () => <div data-testid="mock-todo-list">Mock ToDoList</div>;
});

describe('ToDoApp', () => {

    it('should render the ToDoList component', () => {
        render(<ToDoApp/>);
        const todoListElement = screen.getByTestId('mock-todo-list');
        expect(todoListElement).toBeInTheDocument();
    });
});