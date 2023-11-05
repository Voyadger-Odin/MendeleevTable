import React from 'react';
import './ElementTypes.css';
import Langs from "./lang/langs";

const ElementTypes = ({elementTypesProps, ...props}) => {
    const langs = Langs(elementTypesProps.locale)

    return (
        <div>
            <h1>{langs['Element types']}</h1>
            <table className="elemen_types_table">
                <tbody>
                <tr>
                    <td>
                        <a href="https://en.wikipedia.org/wiki/Alkali_metal" target="_blank" className="link link-default link-none">
                            {(elementTypesProps.tableDisplay === 'Normal mode') ?
                                <div className="element-types-color" style={{background: elementTypesProps.colorsElement['series']['alkali_metals']}}></div>
                                : ''}
                            <span>{langs['alkali_metals']}</span>
                        </a>
                    </td>
                    <td>
                        <a href="https://en.wikipedia.org/wiki/Transition_metal" target="_blank" className="link link-default link-none">
                            {(elementTypesProps.tableDisplay === 'Normal mode') ?
                                <div className="element-types-color" style={{background: elementTypesProps.colorsElement['series']['transition_metal']}}></div>
                                : ''}
                            <span>{langs['transition_metal']}</span>
                        </a>
                    </td>
                    <td>
                        <a href="https://en.wikipedia.org/wiki/Noble_gas" target="_blank" className="link link-default link-none">
                            {(elementTypesProps.tableDisplay === 'Normal mode') ?
                                <div className="element-types-color" style={{background: elementTypesProps.colorsElement['series']['noble_gas']}}></div>
                                : ''}
                            <span>{langs['noble_gas']}</span>
                        </a>
                    </td>
                    <td>
                        <a href="https://en.wikipedia.org/wiki/Lanthanide" target="_blank" className="link link-default link-none">
                            {(elementTypesProps.tableDisplay === 'Normal mode') ?
                                <div className="element-types-color" style={{background: elementTypesProps.colorsElement['series']['lanthanide']}}></div>
                                : ''}
                            <span>{langs['lanthanide']}</span>
                        </a>
                    </td>
                </tr>
                <tr>
                    <td>
                        <a href="https://en.wikipedia.org/wiki/Alkaline_earth_metal" target="_blank" className="link link-default link-none">
                            {(elementTypesProps.tableDisplay === 'Normal mode') ?
                                <div className="element-types-color" style={{background: elementTypesProps.colorsElement['series']['alkaline_earth_metal']}}></div>
                                : ''}
                            <span>{langs['alkaline_earth_metal']}</span>
                        </a>
                    </td>
                    <td>
                        <a href="https://en.wikipedia.org/wiki/Post-transition_metal" target="_blank" className="link link-default link-none">
                            {(elementTypesProps.tableDisplay === 'Normal mode') ?
                                <div className="element-types-color" style={{background: elementTypesProps.colorsElement['series']['post_transition_metal']}}></div>
                                : ''}
                            <span>{langs['post_transition_metal']}</span>
                        </a>
                    </td>
                    <td>
                        <a href="https://en.wikipedia.org/wiki/Halogen" target="_blank" className="link link-default link-none">
                            {(elementTypesProps.tableDisplay === 'Normal mode') ?
                                <div className="element-types-color" style={{background: elementTypesProps.colorsElement['series']['halogen']}}></div>
                                : ''}
                            <span>{langs['halogen']}</span>
                        </a>
                    </td>
                    <td>
                        <a href="https://en.wikipedia.org/wiki/Actinide" target="_blank" className="link link-default link-none">
                            {(elementTypesProps.tableDisplay === 'Normal mode') ?
                                <div className="element-types-color" style={{background: elementTypesProps.colorsElement['series']['actinide']}}></div>
                                : ''}
                            <span>{langs['actinide']}</span>
                        </a>
                    </td>
                </tr>
                <tr>
                    <td>
                        <a href="https://en.wikipedia.org/wiki/Metalloid" target="_blank" className="link link-default link-none">
                            {(elementTypesProps.tableDisplay === 'Normal mode') ?
                                <div className="element-types-color" style={{background: elementTypesProps.colorsElement['series']['semimetal']}}></div>
                                : ''}
                            <span>{langs['semimetal']}</span>
                        </a>
                    </td>
                    <td>
                        <a href="https://en.wikipedia.org/wiki/Nonmetal" target="_blank" className="link link-default link-none">
                            {(elementTypesProps.tableDisplay === 'Normal mode') ?
                                <div className="element-types-color" style={{background: elementTypesProps.colorsElement['series']['nonmetal']}}></div>
                                : ''}
                            <span>{langs['nonmetal']}</span>
                        </a>
                    </td>
                </tr>


                </tbody>
            </table>
        </div>
    );
};

export default ElementTypes;