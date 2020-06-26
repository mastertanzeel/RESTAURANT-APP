import React from 'react';
import './ToolBar.scss';

const ToolBar = ({ leftAction, leftLabel, rightAction, rightLabel }) => (
    <div className="tool-bar">
        {
            (leftAction && leftLabel) &&
            <button onClick={e => leftAction()}>{leftLabel}</button>
        }
        {
            (rightAction && rightLabel) &&
            <button onClick={e => rightAction()}>{rightLabel}</button>
        }
    </div>
)

export default ToolBar;