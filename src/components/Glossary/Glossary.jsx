import React from 'react';
import './Glossary.css';
import Langs from "./lang/langs";

const Glossary = ({locale, ...props}) => {
    const langs = Langs(locale)

    return (
        <div>
            <h1>{langs['glossary']}</h1>
            <br/>
            <table className="glossary-table">
                <tbody>
                <tr>
                    <td><a href="https://en.wikipedia.org/wiki/Atomic_number" target="_blank">{langs['Atomic number']}</a></td>
                    <td><a href="https://en.wikipedia.org/wiki/Curie_temperature" target="_blank">{langs['Curie point']}</a></td>
                    <td><a href="https://en.wikipedia.org/wiki/Enthalpy_of_fusion" target="_blank">{langs['Heat of fusion']}</a></td>
                    <td><a href="https://en.wikipedia.org/wiki/Neutron_cross_section" target="_blank">{langs['Neutron cross-section']}</a></td>
                    <td><a href="https://en.wikipedia.org/wiki/Spectral_line" target="_blank">{langs['Spectral lines']}</a></td>
                </tr>
                <tr>
                    <td><a href="https://en.wikipedia.org/wiki/Atomic_radius" target="_blank">{langs['Atomic radius']}</a></td>
                    <td><a href="https://en.wikipedia.org/wiki/Density" target="_blank">{langs['Density']}</a></td>
                    <td><a href="https://en.wikipedia.org/wiki/Enthalpy_of_vaporization" target="_blank">{langs['Heat of vaporisation']}</a></td>
                    <td><a href="https://en.wikipedia.org/wiki/Neutron_capture" target="_blank">{langs['Neutron mass absorption']}</a></td>
                    <td><a href="https://en.wikipedia.org/wiki/Term_symbol" target="_blank">{langs['Term symbol']}</a></td>
                </tr>
                <tr>
                    <td><a href="https://en.wikipedia.org/wiki/Relative_atomic_mass" target="_blank">{langs['Atomic weight']}</a></td>
                    <td><a href="https://en.wikipedia.org/wiki/Electron_affinity" target="_blank">{langs['Electron affinity']}</a></td>
                    <td><a href="https://en.wikipedia.org/wiki/Ionization_energy" target="_blank">{langs['Ionization energy']}</a></td>
                    <td><a href="https://en.wikipedia.org/wiki/Oxidation_state" target="_blank">{langs['Oxidation states']}</a></td>
                    <td><a href="https://en.wikipedia.org/wiki/Thermal_conductivity" target="_blank">{langs['Thermal conductivity']}</a></td>
                </tr>
                <tr>
                    <td><a href="https://en.wikipedia.org/wiki/Block_(periodic_table)" target="_blank">{langs['Block']}</a></td>
                    <td><a href="https://en.wikipedia.org/wiki/Electronegativity" target="_blank">{langs['Electronegativity']}</a></td>
                    <td><a href="https://en.wikipedia.org/wiki/Isotope" target="_blank">{langs['Isotope']}</a></td>
                    <td><a href="https://en.wikipedia.org/wiki/Period_(periodic_table)" target="_blank">{langs['Period']}</a></td>
                    <td><a href="https://en.wikipedia.org/wiki/Thermal_expansion" target="_blank">{langs['Thermal expansion']}</a></td>
                </tr>
                <tr>
                    <td><a href="https://en.wikipedia.org/wiki/Boiling_point" target="_blank">{langs['Boiling point']}</a></td>
                    <td><a href="https://en.wikipedia.org/wiki/Electron_configuration" target="_blank">{langs['Electronic configuration']}</a></td>
                    <td><a href="https://en.wikipedia.org/wiki/Mass_number" target="_blank">{langs['Mass number']}</a></td>
                    <td><a href="https://en.wikipedia.org/wiki/Poisson%27s_ratio" target="_blank">{langs['Poisson ratio']}</a></td>
                    <td><a href="https://en.wikipedia.org/wiki/Valence_(chemistry)" target="_blank">{langs['Valence']}</a></td>
                </tr>
                <tr>
                    <td><a href="https://en.wikipedia.org/wiki/Electrical_resistivity_and_conductivity" target="_blank">{langs['Conductivity']}</a></td>
                    <td><a href="https://en.wikipedia.org/wiki/Group_(periodic_table)" target="_blank">{langs['Group']}</a></td>
                    <td><a href="https://en.wikipedia.org/wiki/Melting_point" target="_blank">{langs['Melting point']}</a></td>
                    <td><a href="https://en.wikipedia.org/wiki/Electrical_resistivity_and_conductivity" target="_blank">{langs['Resistivity']}</a></td>
                    <td><a href="https://en.wikipedia.org/wiki/Van_der_Waals_radius" target="_blank">{langs['Van der Waals Radius']}</a></td>
                </tr>
                <tr>
                    <td><a href="https://en.wikipedia.org/wiki/Covalent_radius" target="_blank">{langs['Covalent radius']}</a></td>
                    <td><a href="https://en.wikipedia.org/wiki/Half-life" target="_blank">{langs['Half-life period']}</a></td>
                    <td><a href="https://en.wikipedia.org/wiki/Elastic_modulus" target="_blank">{langs['Modulus']}</a></td>
                    <td><a href="https://en.wikipedia.org/wiki/Speed_of_sound" target="_blank">{langs['Sound speed']}</a></td>
                </tr>
                <tr>
                    <td><a href="https://en.wikipedia.org/wiki/Crystal_structure" target="_blank">{langs['Crystal structure']}</a></td>
                    <td><a href="https://en.wikipedia.org/wiki/Hardness" target="_blank">{langs['Hardness']}</a></td>
                    <td><a href="https://en.wikipedia.org/wiki/Molar_volume" target="_blank">{langs['Molar volume']}</a></td>
                    <td><a href="https://en.wikipedia.org/wiki/Specific_heat_capacity" target="_blank">{langs['Specific heat']}</a></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Glossary;