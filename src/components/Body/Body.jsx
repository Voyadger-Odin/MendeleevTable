import React from 'react';
import './Body.css';

const Body = (props) => {
    return (
        <div className="main-panel">
            <div className="content-wrapper">
                {props.children}
            </div>
        </div>
    );
};

export default Body;