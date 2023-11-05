import React from 'react';
import MendeleevTable from "../MendeleevTable/MendeleevTable";
import './ComponentToPrint.css';

const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
        <div
            ref={ref}
            className={((props.theme === 'dark') ? "theme-dark" : "") + " component-to-print"}
        >
            <MendeleevTable
                mendeleevTableProps={props.mendeleevTableProps}
                onlyShow={true}
            />
        </div>
    );
});

export default ComponentToPrint;