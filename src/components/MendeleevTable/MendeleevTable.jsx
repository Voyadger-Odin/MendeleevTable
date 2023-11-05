import React, {useState} from 'react';
import MendeleevTableData from './data/MendeleevTable.json';
import LangsTable from "./data/lang/LangsTable";
import Langs from "./lang/langs";

import './MendeleevTable.css';
import Element from "./components/Element/Element";
import Legend from "./components/Legend/Legend";
import Modal from "./components/Modal/Modal";
import ElementTypes from "./components/ElementTypes/ElementTypes";
import {celsiusToFahrenheit, celsiusToKelvin, getTemperatureName} from "../../utils/temperature";

const MendeleevTable = ({mendeleevTableProps, onlyShow=false, ...props}) => {
    const locale = mendeleevTableProps.locale
    const langsTable = LangsTable(locale)
    const langs = Langs(locale)

    const [elementSelected, setElementSelected] = useState('1')

    const [elementActive, setElementActive] = useState('1')
    const [showModal, setShowModal] = useState(false)

    const functionsDisplayData = {
        getDefault: (data) => {
            if (data === null){
                return 'N/A'
            }
            return data
        },
        getGroup: (data) => {
            if (data === null){
                return '—'
            }
            return data
        },
        getWeight: (data, exists_in_nature) => {
            if (data === null){
                return 'N/A'
            }
            if (!exists_in_nature){
                return `[${data}]`
            }
            return data
        },
        getTemperature: (data) => {
            if (data === null){
                return 'N/A'
            }
            return `${
                {
                    'c': data,
                    'k': celsiusToKelvin(data),
                    'f': celsiusToFahrenheit(data),
                }[mendeleevTableProps.temperatureMode]
            } ${getTemperatureName(mendeleevTableProps.temperatureMode)}`
        },
        getDensity: (data) => {
            if (data === null){
                return 'N/A'
            }
            return `${data} ${langs['Density_dimension']}`
        },
        getAtomicRadius: (data) => {
            if (data === null){
                return 'N/A'
            }
            return `${data} pm`
        },
        getHalfLifePeriod: (data, symbol) => {
            if (data === null){
                return 'N/A'
            }
            return `${data} ${symbol}`
        },
        getPercents: (data) => {
            if (data === null){
                return 'N/A'
            }
            return `${data} %`
        },
    }


    const colorsElement = {
        'series': {
            'nonmetal': '#79ad26',
            'alkali_metals': '#d04949',
            'alkaline_earth_metal': '#da9211',
            'transition_metal': '#95b0d7',
            'noble_gas': '#e889d5',
            'lanthanide': '#6eb09d',
            'actinide': '#517a6e',
            'semimetal': '#66b2c9',
            'post_transition_metal': '#7f9ad9',
            'halogen': '#d3907a',
        },
        'density': [
            '#675c4c',
            '#64461b',
        ],
        'electronegativity': [
            '#5bd2e8',
            '#8700fc',
            '#e80aaa',
        ],
        'radius': [
            '#ecab7f',
            '#9f51bb',
            '#a90ae8',
        ],
        'boiling_temperature': [
            '#0fb8f5',
            '#d7b05f',
            '#dc9c17',
            '#f5ac0f',
            '#d37d6e',
            '#e14222',
        ],
        'half-life_period': [
            '#dab31e',
            '#987c06',
        ],
        'abundance_in_earth_crust': [
            '#939fa6',
            '#5b9ec7',
            '#3791c9',
            '#1e89cc',
            '#148bd7',
        ],
        'abundance_in_universe': [
            '#939fa6',
            '#5b9ec7',
            '#3791c9',
            '#1e89cc',
            '#148bd7',
        ],
    }

    const getColorElement = (element, tableDisplay) => {
        const colorInterpolation = (a, b, amount) => {
            let ah = parseInt(a.replace(/#/g, ''), 16),
                ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
                bh = parseInt(b.replace(/#/g, ''), 16),
                br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
                rr = ar + amount * (br - ar),
                rg = ag + amount * (bg - ag),
                rb = ab + amount * (bb - ab);

            return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
        }

        const colorInterpolationGradient = (colors, amount) => {
            const segmentLength = 1 / (colors.length - 1)
            let segment = parseInt(amount / segmentLength)
            if (segment > colors.length - 2){
                segment = colors.length - 2
            }

            const min = segment * segmentLength
            const max = (segment + 1) * segmentLength
            amount = (amount - min) / (max - min)

            return colorInterpolation(colors[segment], colors[segment + 1], amount)
        }

        const colorDefault = '#626262'

        let colorResult = colorDefault

        // Normal mode
        if (tableDisplay === 'Normal mode'){
            colorResult = colorsElement['series'][element['series']]
        }

        // Density
        if (tableDisplay === 'Density' && element['density'] !== null){
            const min = 0.0899
            const max = 23
            const amount = (element['density'] - min) / (max - min)
            colorResult = colorInterpolationGradient(colorsElement['density'], amount)
        }

        // Boiling point
        if (tableDisplay === 'Boiling point' && element['boiling_temperature'] !== null){

            const min = -260
            const max = 5600
            const amount = (element['boiling_temperature'] - min) / (max - min)
            colorResult = colorInterpolationGradient(colorsElement['boiling_temperature'], amount)
        }

        // Melting point
        if (tableDisplay === 'Melting point' && element['melting_temperature'] !== null){
            const min = -260
            const max = 3500
            const amount = (element['melting_temperature'] - min) / (max - min)
            colorResult = colorInterpolationGradient(colorsElement['boiling_temperature'], amount)
        }

        // E-negativity
        if (tableDisplay === 'E-negativity' && element['electronegativity'] !== null){
            const min = 0.08
            const max = 4
            const amount = (element['electronegativity'] - min) / (max - min)
            colorResult = colorInterpolationGradient(colorsElement['electronegativity'], amount)
        }

        // Atomic radius
        if (tableDisplay === 'Atomic radius' && element['radius'] !== null){
            const min = 30
            const max = 300
            const amount = (element['radius'] - min) / (max - min)
            colorResult = colorInterpolationGradient(colorsElement['radius'], amount)
        }

        // Half-life period
        if (tableDisplay === 'Half-life period' && element['half-life_period'] !== null){
            const min = 4
            const max = 210000
            const amount = (element['half-life_period'] - min) / (max - min)
            colorResult = colorInterpolationGradient(colorsElement['half-life_period'], amount)
        }

        // Abundance in Earth crust
        if (tableDisplay === 'Abundance in Earth crust' && element['abundance_in_earth_crust'] !== null){
            const min = 0
            const max = 50
            const amount = (element['abundance_in_earth_crust'] - min) / (max - min)
            colorResult = colorInterpolationGradient(colorsElement['abundance_in_earth_crust'], amount)
        }

        // Abundance in Universe
        if (tableDisplay === 'Abundance in Universe' && element['abundance_in_universe'] !== null){
            const min = 0
            const max = 50
            const amount = (element['abundance_in_universe'] - min) / (max - min)
            colorResult = colorInterpolationGradient(colorsElement['abundance_in_universe'], amount)
        }





        return [colorResult, colorInterpolation(colorResult, '#000000', 0.2)]
    }


    /* Modal */
    const modalProps = {
        functionsDisplayData: functionsDisplayData,
        elementNumber: elementActive,
        element: MendeleevTableData[elementActive],
        langsTable: langsTable,
        langsMain: langs,
        showModal: showModal,
        setShowModal: setShowModal,
        getColorElement: getColorElement,
        tableDisplay: mendeleevTableProps.tableDisplay,
    }

    const elementClick = (element) => {
        setElementActive(element)
        setShowModal(true)
    }
    /* End modal */



    const elementProps = {
        functionsDisplayData: functionsDisplayData,
        getColorElement: getColorElement,
        setElementSelected: setElementSelected,
        langsTable: langsTable,
        elements: MendeleevTableData,
        tableDisplay: mendeleevTableProps.tableDisplay,
        elementClick: elementClick,
    }


    const elementTypesProps = {
        colorsElement: colorsElement,
        locale: locale,
        tableDisplay: mendeleevTableProps.tableDisplay,
    }



    return (
        <>
            <div className="Mendeleev-table">
                <div className="elements">

                    <div className="row">
                        <Element elementProps={elementProps} elementId={'1'} borderRadius="br-top-left-right" />

                        <div className="cell-space-16"></div>

                        <Element elementProps={elementProps} elementId={'2'} borderRadius="br-top-left-right" />
                    </div>
                    <div className="row">

                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'3'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'4'} borderRadius="br-top-right" />

                        <div className="cell-space-10"></div>

                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'5'} borderRadius="br-top-left" />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'6'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'7'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'8'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'9'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'10'} />
                    </div>
                    <div className="row">

                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'11'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'12'} />

                        <div className="cell-space-10"></div>

                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'13'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'14'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'15'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'16'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'17'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'18'} />
                    </div>
                    <div className="row">
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'19'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'20'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'21'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'22'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'23'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'24'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'25'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'26'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'27'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'28'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'29'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'30'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'31'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'32'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'33'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'34'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'35'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'36'} />
                    </div>
                    <div className="row">
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'37'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'38'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'39'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'40'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'41'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'42'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'43'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'44'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'45'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'46'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'47'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'48'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'49'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'50'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'51'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'52'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'53'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'54'} />
                    </div>
                    <div className="row">
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'55'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'56'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'57'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'72'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'73'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'74'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'75'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'76'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'77'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'78'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'79'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'80'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'81'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'82'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'83'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'84'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'85'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'86'} />
                    </div>
                    <div className="row">
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'87'} borderRadius="br-bottom-left" />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'88'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'89'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'104'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'105'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'106'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'107'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'108'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'109'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'110'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'111'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'112'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'113'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'114'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'115'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'116'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'117'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'118'} borderRadius="br-bottom-right" />
                    </div>

                    <div className="numbers">
                        {/* Top */}
                        <div className="numbers-top" style={{transform: `translate(calc(var(--element-real) * 0), calc(var(--element-real) * 0 - var(--numbers-top-size)))`}}>1</div>
                        <div className="numbers-top" style={{transform: `translate(calc(var(--element-real) * 1), calc(var(--element-real) * 1 - var(--numbers-top-size)))`}}>2</div>
                        <div className="numbers-top" style={{transform: `translate(calc(var(--element-real) * 2), calc(var(--element-real) * 3 - var(--numbers-top-size)))`}}>3</div>
                        <div className="numbers-top" style={{transform: `translate(calc(var(--element-real) * 3), calc(var(--element-real) * 3 - var(--numbers-top-size)))`}}>4</div>
                        <div className="numbers-top" style={{transform: `translate(calc(var(--element-real) * 4), calc(var(--element-real) * 3 - var(--numbers-top-size)))`}}>5</div>
                        <div className="numbers-top" style={{transform: `translate(calc(var(--element-real) * 5), calc(var(--element-real) * 3 - var(--numbers-top-size)))`}}>6</div>
                        <div className="numbers-top" style={{transform: `translate(calc(var(--element-real) * 6), calc(var(--element-real) * 3 - var(--numbers-top-size)))`}}>7</div>
                        <div className="numbers-top" style={{transform: `translate(calc(var(--element-real) * 7), calc(var(--element-real) * 3 - var(--numbers-top-size)))`}}>8</div>
                        <div className="numbers-top" style={{transform: `translate(calc(var(--element-real) * 8), calc(var(--element-real) * 3 - var(--numbers-top-size)))`}}>9</div>
                        <div className="numbers-top" style={{transform: `translate(calc(var(--element-real) * 9), calc(var(--element-real) * 3 - var(--numbers-top-size)))`}}>10</div>
                        <div className="numbers-top" style={{transform: `translate(calc(var(--element-real) * 10), calc(var(--element-real) * 3 - var(--numbers-top-size)))`}}>11</div>
                        <div className="numbers-top" style={{transform: `translate(calc(var(--element-real) * 11), calc(var(--element-real) * 3 - var(--numbers-top-size)))`}}>12</div>
                        <div className="numbers-top" style={{transform: `translate(calc(var(--element-real) * 12), calc(var(--element-real) * 1 - var(--numbers-top-size)))`}}>13</div>
                        <div className="numbers-top" style={{transform: `translate(calc(var(--element-real) * 13), calc(var(--element-real) * 1 - var(--numbers-top-size)))`}}>14</div>
                        <div className="numbers-top" style={{transform: `translate(calc(var(--element-real) * 14), calc(var(--element-real) * 1 - var(--numbers-top-size)))`}}>15</div>
                        <div className="numbers-top" style={{transform: `translate(calc(var(--element-real) * 15), calc(var(--element-real) * 1 - var(--numbers-top-size)))`}}>16</div>
                        <div className="numbers-top" style={{transform: `translate(calc(var(--element-real) * 16), calc(var(--element-real) * 1 - var(--numbers-top-size)))`}}>17</div>
                        <div className="numbers-top" style={{transform: `translate(calc(var(--element-real) * 17), calc(var(--element-real) * 0 - var(--numbers-top-size)))`}}>18</div>

                        {/* Left */}
                        <div className="numbers-left" style={{transform: `translate(calc(-1 * var(--numbers-left-size)), calc(var(--element-real) * 0))`}}>1</div>
                        <div className="numbers-left" style={{transform: `translate(calc(-1 * var(--numbers-left-size)), calc(var(--element-real) * 1))`}}>2</div>
                        <div className="numbers-left" style={{transform: `translate(calc(-1 * var(--numbers-left-size)), calc(var(--element-real) * 2))`}}>3</div>
                        <div className="numbers-left" style={{transform: `translate(calc(-1 * var(--numbers-left-size)), calc(var(--element-real) * 3))`}}>4</div>
                        <div className="numbers-left" style={{transform: `translate(calc(-1 * var(--numbers-left-size)), calc(var(--element-real) * 4))`}}>5</div>
                        <div className="numbers-left" style={{transform: `translate(calc(-1 * var(--numbers-left-size)), calc(var(--element-real) * 5))`}}>6</div>
                        <div className="numbers-left" style={{transform: `translate(calc(-1 * var(--numbers-left-size)), calc(var(--element-real) * 6))`}}>7</div>
                    </div>
                </div>

                <div style={{height: '10px'}}></div>

                <div className="elements">
                    <div className="row">
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'57'} borderRadius="br-top-left" />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'58'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'59'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'60'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'61'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'62'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'63'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'64'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'65'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'66'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'67'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'68'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'69'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'70'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'71'} borderRadius="br-top-right" />
                    </div>
                    <div className="row">
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'89'} borderRadius="br-bottom-left" />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'90'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'91'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'92'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'93'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'94'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'95'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'96'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'97'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'98'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'99'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'100'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'101'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'102'} />
                        <Element elementProps={elementProps} functionsDisplayData={functionsDisplayData} elementId={'103'} borderRadius="br-bottom-right" />
                    </div>

                    <div className="numbers">
                        {/* Left */}
                        <div className="numbers-left" style={{transform: `translate(calc(-1 * var(--numbers-left-size)), calc(var(--element-real) * 0))`}}>6</div>
                        <div className="numbers-left" style={{transform: `translate(calc(-1 * var(--numbers-left-size)), calc(var(--element-real) * 1))`}}>7</div>
                    </div>
                </div>

                <Legend
                    elementProps={elementProps}

                    locale={locale}
                    elementSelected={elementSelected}


                    setTableDisplay={mendeleevTableProps.setTableDisplay}
                    functionsDisplayData={functionsDisplayData}

                />


                {!onlyShow
                    ? <Modal modalProps={modalProps} />
                    : ''
                }
            </div>

            <ElementTypes elementTypesProps={elementTypesProps}/>
        </>
    );
};

export default MendeleevTable;