import React from 'react';
import './ProgressBar.css'

interface ProgressBarProps {
    completedCount: number;
    totalTasks: number;
}

function CompletionMeter({completedCount, totalTasks}: ProgressBarProps) {
    const completionPercentage = (completedCount / totalTasks) * 100;

    let barText;

    if (completionPercentage === 100) {
        barText = "All tasks complete!";
    } else if (completionPercentage > 0) {
        barText = `${completionPercentage.toFixed(0)}%`;
    } else {
        barText = '';
    }

    return (
        <div className="completion-meter">
            <div
                className="completion-progress"
                style={{width: `${completionPercentage}%`}}
            >
                {barText && (
                    <div>
                        {barText}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CompletionMeter;