import React from 'react';
import './Element.css';

const Element = ({elementProps, elementId, ...props}) => {
    const element = elementProps.elements[elementId]

    const colorDefault = ['#555', '#666']

    function getColor(elementId) {
        const series = elementProps.elements[elementId]['series']
        if (elementProps.getColorElement(element, elementProps.tableDisplay)){
            return elementProps.getColorElement(element, elementProps.tableDisplay)[0]
        }
        return colorDefault[0]
    }

    const elementHover = (event, elementId) => {
        if (event.target.classList.contains('element')){
            const series = elementProps.elements[elementId]['series']
            event.target.style.background = elementProps.getColorElement(element, elementProps.tableDisplay)[1]
            elementProps.setElementSelected(elementId)
        }
    }

    const elementHoverOut = (event, elementId) => {
        if (event.target.classList.contains('element')){
            const series = elementProps.elements[elementId]['series']
            event.target.style.background = elementProps.getColorElement(element, elementProps.tableDisplay)[0]
            event.target.style.background = getColor(elementId)
        }
    }

    const getElementBottomData = (element, tableDisplay) => {
        return {
            'Normal mode': elementProps.functionsDisplayData.getWeight(element['weight'], element['exists_in_nature']),
            'Boiling point': elementProps.functionsDisplayData.getTemperature(element['boiling_temperature']),
            'Melting point': elementProps.functionsDisplayData.getTemperature(element['melting_temperature']),
            'E-negativity': elementProps.functionsDisplayData.getDefault(element['electronegativity']),
            'Atomic radius': elementProps.functionsDisplayData.getAtomicRadius(element['radius']),
            'Half-life period': elementProps.functionsDisplayData.getHalfLifePeriod(element['half-life_period'], element['half-life_symbol']),
            'Density': elementProps.functionsDisplayData.getDensity(element['density']),
            'Abundance in Earth crust': elementProps.functionsDisplayData.getPercents(element['abundance_in_earth_crust']),
            'Abundance in Universe': elementProps.functionsDisplayData.getPercents(element['abundance_in_universe']),
        }[tableDisplay]
    }

    return (
        <div
            className={"element " + props['borderRadius'] + " " + props['elementLegend']}
            style={{background: getColor(elementId)}}
            onMouseOver={event => elementHover(event, elementId)}
            onMouseOut={event => elementHoverOut(event, elementId)}
            onClick={event => elementProps.elementClick(elementId)}
        >
            <div className="elementData">
                <div className="row row-element">
                    <div className="container">
                        <div className="symbol">{element['name']}</div>
                    </div>
                    <div className="container">
                        <div className="number">{elementId}</div>
                    </div>
                </div>
                <div className="name">{elementProps.langsTable[elementId]['fullname']}</div>
                <div className="weight">{getElementBottomData(element, elementProps.tableDisplay)}</div>
            </div>
        </div>
    );
};

export default Element;