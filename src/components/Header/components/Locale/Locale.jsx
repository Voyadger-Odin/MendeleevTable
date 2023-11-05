import React from 'react';
import './Locale.css';

const Locale = ({locale, setLocale, ...props}) => {
    const locales = {
        'ru': 'Ru',
        'en': 'En'
    }

    const changeLocal = (locale) => {
        setLocale(locale)
        closeLocalSelect()
    }

    const closeLocalSelect = () => {
        const localObj = document.querySelector('.locale');
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

    const openLocalSelect = (target) => {
        const localObj = document.querySelector('.locale');
        if(localObj.getAttribute('open') === null){
            localObj.setAttribute('open', '')
        }else{
            closeLocalSelect()
        }
    }

    // Клик по документу
    document.addEventListener('click', function (event) {
        const localObj = document.querySelector('.local-name');
        // Закрыть select
        if (event.target !== localObj){
            closeLocalSelect()
        }
    })

    return (
        <div className="locale">
            <div
                className="local-name"
                onClick={event => openLocalSelect(event.target)}
            >
                {locales[locale]}
            </div>
            <div className="locale-select">
                <div className="locale-select-item" onClick={event => changeLocal('en')}>En</div>
                <div className="locale-select-item" onClick={event => changeLocal('ru')}>Ru</div>
            </div>
        </div>
    );
};

export default Locale;