import React from 'react';
import './TemperatureMode.css';
import {getTemperatureName} from "../../../../utils/temperature";

const TemperatureMode = ({temperatureMode, setTemperatureMode, ...props}) => {
    const locales = {
        'ru': 'Ru',
        'en': 'En'
    }

    const changeTemperatureMode = (temperature) => {
        setTemperatureMode(temperature)
        closeTemperatureModeSelect()
    }

    const closeTemperatureModeSelect = () => {
        const temperatureModeObj = document.querySelector('.temperature-mode');
        if(temperatureModeObj.getAttribute('open') === null){return}
        temperatureModeObj.setAttribute('closing', '')
        temperatureModeObj.addEventListener(
            "animationend",
            () => {
                temperatureModeObj.removeAttribute("closing");
                temperatureModeObj.removeAttribute('open')
            },
            {
                once: true
            }
        );
    }

    const openTemperatureModeSelect = (target) => {
        const localObj = document.querySelector('.temperature-mode');
        if(localObj.getAttribute('open') === null){
            localObj.setAttribute('open', '')
        }else{
            closeTemperatureModeSelect()
        }
    }

    // Клик по документу
    document.addEventListener('click', function (event) {
        const localObj = document.querySelector('.temperature-mode-name');
        // Закрыть select
        if (event.target !== localObj){
            closeTemperatureModeSelect()
        }
    })

    return (
        <div className="temperature-mode">
            <div
                className="temperature-mode-name"
                onClick={event => openTemperatureModeSelect(event.target)}
            >
                {getTemperatureName(temperatureMode)}
            </div>
            <div className="temperature-mode-select">
                <div className="temperature-mode-select-item" onClick={event => changeTemperatureMode('c')}>{getTemperatureName('c')}</div>
                <div className="temperature-mode-select-item" onClick={event => changeTemperatureMode('k')}>{getTemperatureName('k')}</div>
                <div className="temperature-mode-select-item" onClick={event => changeTemperatureMode('f')}>{getTemperatureName('f')}</div>
            </div>
        </div>
    );
};

export default TemperatureMode;