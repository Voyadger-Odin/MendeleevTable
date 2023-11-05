import React from 'react';
import './Legend.css';
import Element from "../Element/Element";

import Langs from "../../lang/langs";
import TableDisplay from "./components/TableDisplay/TableDisplay";

const Legend = ({
                    elementProps,
                    elementSelected,
                    locale,
                    setTableDisplay,
                    functionsDisplayData,
                    setElementSelected,
                    ...props
}) => {

    const langs = Langs(locale)

    const element = elementProps.elements[elementSelected]


    function drawLineNumber(context){
        context.lineWidth = 2
        context.beginPath()
        context.moveTo(10, 25)
        context.lineTo(30, 25)
        context.lineTo(50, 0)
        context.lineTo(160, 0)
        context.lineTo(170, 15)
        context.stroke()
    }

    function drawLineSymbol(context){
        context.lineWidth = 2
        context.beginPath()
        context.moveTo(10, 53)
        context.lineTo(65, 53)
        context.stroke()
    }

    function drawLineName(context){
        context.lineWidth = 2
        context.beginPath()
        context.moveTo(10, 80)
        context.lineTo(63, 80)
        context.stroke()
    }

    function drawLineWeight(context){
        context.lineWidth = 2
        context.beginPath()
        context.moveTo(10, 110)
        context.lineTo(30, 110)
        context.lineTo(45, 95)
        context.lineTo(63, 95)
        context.stroke()
    }

    const drawLegendCanvas = () => {
        const legend_explanation_canvas = document.querySelector('#legend-explanation-canvas')
        const context = legend_explanation_canvas.getContext('2d')
        legend_explanation_canvas.width = 180
        legend_explanation_canvas.height = 150

        context.strokeStyle = '#fff'

        drawLineNumber(context)
        drawLineSymbol(context)
        drawLineName(context)
        drawLineWeight(context)
    }

    window.onload = function() { // можно также использовать window.addEventListener('load', (event) => {
        drawLegendCanvas()
    };


    return (
        <div className="legend">
            <div className="legend-row">

                <div className="legend-block">

                    <div className="legend-explanation" style={{display: 'none'}}>
                        <table>
                            <tbody>
                            <tr><td>{langs['number']}</td></tr>
                            <tr><td>{langs['symbol']}</td></tr>
                            <tr><td>{langs['name']}</td></tr>
                            <tr><td>{
                                {
                                    'Normal mode': langs['mass'],
                                    'Density': langs['Density'],
                                    'Boiling point': langs['Boiling point'],
                                    'Melting point': langs['Melting point'],
                                    'E-negativity': langs['E-negativity'],
                                    'Atomic radius': langs['Atomic radius'],
                                    'Half-life period': langs['Half-life period'],
                                    'Abundance in Earth crust': langs['Abundance in Earth crust'],
                                    'Abundance in Universe': langs['Abundance in Universe'],
                                }[elementProps.tableDisplay]
                            }</td></tr>
                            </tbody>
                        </table>
                        <canvas id="legend-explanation-canvas" className="legend-explanation-canvas"></canvas>
                    </div>


                    <Element elementProps={elementProps} elementId={elementSelected} borderRadius="br" elementLegend="element-legend" />

                    <div className="legend-description">
                        <table>
                            <tbody>
                            <tr>
                                <td><span style={{color: elementProps.getColorElement(element, 'Normal mode')[0]}}>{langs[element['series']]}</span></td>
                            </tr>
                            <tr>
                                <td>{langs['Atomic weight']}</td>
                                <td className="legend-element-value">{element['weight']}</td>
                            </tr>
                            <tr>
                                <td>{langs['Melting point']}</td>
                                <td className="legend-element-value">{functionsDisplayData.getTemperature(element['melting_temperature'])}</td>
                            </tr>
                            <tr>
                                <td>{langs['Boiling point']}</td>
                                <td className="legend-element-value">{functionsDisplayData.getTemperature(element['boiling_temperature'])}</td>
                            </tr>
                            <tr>
                                <td>{langs['Density']}</td>
                                <td className="legend-element-value">{functionsDisplayData.getDensity(element['density'])}</td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="legend-block">
                    <TableDisplay tableDisplay={elementProps.tableDisplay} setTableDisplay={setTableDisplay} locale={locale}/>
                </div>

            </div>
        </div>
    );
};

export default Legend;