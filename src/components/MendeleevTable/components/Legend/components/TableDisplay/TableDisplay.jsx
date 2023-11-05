import React from 'react';
import icon_atom from "../../../../img/table_display/icon-atom.png";
import icon_boiling from "../../../../img/table_display/icon-boiling.png";
import icon_density from "../../../../img/table_display/icon-density.png";
import icon_earth from "../../../../img/table_display/icon-earth.png";
import icon_galaxy from "../../../../img/table_display/icon-galaxy.png";
import icon_halflife from "../../../../img/table_display/icon-halflife.png";
import icon_halflife_2 from "../../../../img/table_display/icon-halflife-2.png";
import icon_heatmaps from "../../../../img/table_display/icon-heatmaps.png";
import icon_melting from "../../../../img/table_display/icon-melting.png";
import icon_radius from "../../../../img/table_display/icon-radius.png";
import './TableDisplay.css';
import TableDisplayItem from "./TableDisplayItem";

import Langs from "./lang/langs";

const TableDisplay = ({tableDisplay, setTableDisplay, locale}) => {

    const langs = Langs(locale)

    const changeTableDisplay = (display, table_display) => {
        setTableDisplay(display)
        closeTableDisplaySelect(table_display)
    }

    const closeTableDisplaySelect = (localObj) => {
        if(localObj.getAttribute('open') === null){return}
        localObj.setAttribute('closing', '')
        localObj.addEventListener(
            "animationend",
            () => {
                localObj.removeAttribute("closing");
                localObj.removeAttribute('open')
            },
            {
                once: true
            }
        );
    }

    const openTableDisplaySelect = (target) => {
        const localObj = target.parentElement;
        if(localObj.getAttribute('open') === null){
            localObj.setAttribute('open', '')
        }else{
            closeTableDisplaySelect(localObj)
        }
    }

    // Клик по документу
    document.addEventListener('click', function (event) {
        const localObjs = document.querySelectorAll('.table-display-data');
        // Закрыть select
        localObjs.forEach((localObj) => {
            if (event.target !== localObj){
                closeTableDisplaySelect(localObj.parentElement)
            }
        })
    })

    const tableDisplayData = {
        'Normal mode': {
            'img': icon_heatmaps,
            'text': langs['Normal mode'],
        },
        'Boiling point': {
            'img': icon_boiling,
            'text': langs['Boiling point'],
        },
        'Melting point': {
            'img': icon_melting,
            'text': langs['Melting point'],
        },
        'E-negativity': {
            'img': icon_atom,
            'text': langs['E-negativity'],
        },
        'Atomic radius': {
            'img': icon_radius,
            'text': langs['Atomic radius'],
        },
        'Half-life period': {
            'img': icon_halflife_2,
            'text': langs['Half-life period'],
        },
        'Density': {
            'img': icon_density,
            'text': langs['Density'],
        },
        'Abundance in Earth crust': {
            'img': icon_earth,
            'text': langs['Abundance in Earth crust'],
        },
        'Abundance in Universe': {
            'img': icon_galaxy,
            'text': langs['Abundance in Universe'],
        },

    }

    return (
        <div className="table-display">
            <div
                className="table-display-data"
                onClick={event => openTableDisplaySelect(event.target)}
            >
                <img className="table-display-img" src={tableDisplayData[tableDisplay]['img']} alt="table-display-img" />
                <span className="table-display-name">{tableDisplayData[tableDisplay]['text']}</span>
            </div>

            <div className="table-display-menu">
                <div className="row">
                    <TableDisplayItem changeTableDisplay={changeTableDisplay} tableDisplayData={tableDisplayData} mode={'Normal mode'}/>
                    <TableDisplayItem changeTableDisplay={changeTableDisplay} tableDisplayData={tableDisplayData} mode={'Melting point'}/>
                    <TableDisplayItem changeTableDisplay={changeTableDisplay} tableDisplayData={tableDisplayData} mode={'Boiling point'}/>
                </div>
                <div className="row">
                    <TableDisplayItem changeTableDisplay={changeTableDisplay} tableDisplayData={tableDisplayData} mode={'E-negativity'}/>
                    <TableDisplayItem changeTableDisplay={changeTableDisplay} tableDisplayData={tableDisplayData} mode={'Atomic radius'}/>
                    <TableDisplayItem changeTableDisplay={changeTableDisplay} tableDisplayData={tableDisplayData} mode={'Half-life period'}/>
                </div>
                <div className="row">
                    <TableDisplayItem changeTableDisplay={changeTableDisplay} tableDisplayData={tableDisplayData} mode={'Density'}/>
                    <TableDisplayItem changeTableDisplay={changeTableDisplay} tableDisplayData={tableDisplayData} mode={'Abundance in Earth crust'}/>
                    <TableDisplayItem changeTableDisplay={changeTableDisplay} tableDisplayData={tableDisplayData} mode={'Abundance in Universe'}/>
                </div>

            </div>
        </div>
    );
};

export default TableDisplay;