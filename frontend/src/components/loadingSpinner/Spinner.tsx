import React from 'react';
import './Spinner.css';

export default function Spinner() {
    return (
        <div className="spinner-container" data-testid="spinner">
            <div className="spinner" />
        </div>
    )
}