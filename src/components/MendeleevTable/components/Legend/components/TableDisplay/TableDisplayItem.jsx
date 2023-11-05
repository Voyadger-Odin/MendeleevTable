import React from 'react';

const TableDisplayItem = ({changeTableDisplay, tableDisplayData, mode}) => {

    return (
        <div className="table-display-data-item" onClick={event => changeTableDisplay(mode, event.target.parentElement.parentElement.parentElement)}>
            <img className="table-display-img" src={tableDisplayData[mode]['img']} alt="table-display-img" />
            <span className="table-display-name">{tableDisplayData[mode]['text']}</span>
        </div>
    );
};

export default TableDisplayItem;