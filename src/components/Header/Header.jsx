import React from 'react';
import classes from './Header.css';
import Locale from "./components/Locale/Locale";
import Langs from "./lang/langs";
import TemperatureMode from "./components/TemperatureMode/TemperatureMode";

import icon_printer from '../../assets/icons/printer.png';


const Header = ({headerProps, locale, setLocale, ...props}) => {
    const langs = Langs(headerProps.locale)

    return (
        <header>


            <div className="header-item" style={{marginLeft: 25 + "px"}}>
                <button
                onClick={headerProps.handlePrint}
                    className="print-table-btn"
                >
                    <img src={icon_printer}/>
                </button>
            </div>
            <div className="header-item">
                <span className="header-title">{langs['header-title']}</span>
            </div>
            <div className="header-item" style={{marginRight: 25 + "px"}}>
                <TemperatureMode temperatureMode={headerProps.temperatureMode} setTemperatureMode={headerProps.setTemperatureMode} />
                <Locale locale={headerProps.locale} setLocale={headerProps.setLocale}/>
            </div>
        </header>
    );
};

export default Header;