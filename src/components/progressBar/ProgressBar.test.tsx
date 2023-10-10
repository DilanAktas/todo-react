import React from 'react';
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react';
import ProgressBar from './ProgressBar';

describe('Progress Bar', () => {

    it('should display completion percentage correctly', () => {
        render(<ProgressBar completedCount={2} totalTasks={5}/>);

        const progressElement = screen.getByText('40%');

        expect(progressElement).toBeInTheDocument();
    });

    it('should display a congratulatory message when completion is 100%', () => {
        render(<ProgressBar completedCount={5} totalTasks={5}/>);

        const congratulatoryMessage = screen.getByText('All tasks complete!');

        expect(congratulatoryMessage).toBeInTheDocument();
    });

    it('should not display a congratulatory message when completion is not 100%', () => {
        render(<ProgressBar completedCount={2} totalTasks={5}/>);

        const congratulatoryMessage = screen.queryByText('Congrats! You have completed your Tasks :)');

        expect(congratulatoryMessage).not.toBeInTheDocument();
    });
});
