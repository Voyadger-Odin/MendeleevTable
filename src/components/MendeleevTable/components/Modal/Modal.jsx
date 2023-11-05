import React, {useState} from 'react';
import './Modal.css';

const Modal = ({modalProps, ...props}) => {

    const [isShowModal, setIsShowModal] = useState(false)

    const closeModal = () => {
        setIsShowModal(false)
        modalProps.setShowModal(false)
        const localObj = document.querySelector('.table-modal');
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

    const openModal = (target) => {
        const localObj = document.querySelector('.table-modal');
        if(localObj.getAttribute('open') === null){
            localObj.setAttribute('open', '')
        }else{
            closeModal()
        }
    }


    if (modalProps.showModal !== isShowModal){
        setIsShowModal(modalProps.showModal)
        openModal()
    }

    return (
        <div className="table-modal">
            <div className="table-modal-body-background"></div>
            <div className="table-modal-body">
                <div className="table-modal-header">
                    <button onClick={closeModal} className="table-modal-header-close-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                        </svg>
                    </button>
                </div>
                <div className="table-modal-content">
                    <br/><br/><br/><br/>

                    <div className="table-modal-item-number">
                        {modalProps.elementNumber}
                    </div>
                    <div className="table-modal-item-symbol">
                        <span>{modalProps.element['name']}</span>
                        <div
                            className="table-modal-item-radial-gradient"
                            style={{background: `radial-gradient(circle at 130px 50%,   ${modalProps.getColorElement(modalProps.element, modalProps.tableDisplay)[0]}  0%, rgba(22, 125, 255, 0) calc(0% + 130px)) no-repeat border-box border-box rgba(0, 0, 0, 0)`}}
                        ></div>
                    </div>
                    <div className="table-modal-item-name">
                        {modalProps.langsTable[modalProps.elementNumber]['fullname']}
                    </div>
                    <div className="table-modal-item-description">
                        {modalProps.langsTable[modalProps.elementNumber]['description']}
                    </div>

                    <div className="table-modal-item-summary">
                        <span>Summary</span>
                        <table>
                            <tbody>
                            {/* Символ */}
                            <tr>
                                <td>{modalProps.langsMain['symbol']}</td>
                                <td>{modalProps.element['name']}</td>
                            </tr>

                            {/* Название */}
                            <tr>
                                <td>{modalProps.langsMain['name']}</td>
                                <td>{modalProps.langsTable[modalProps.elementNumber]['fullname']}</td>
                            </tr>

                            {/* Категория */}
                            <tr>
                                <td>{modalProps.langsMain['series']}</td>
                                <td>{modalProps.langsMain[modalProps.element['series']]}</td>
                            </tr>

                            {/* Период */}
                            <tr>
                                <td>{modalProps.langsMain['period']}</td>
                                <td>{modalProps.element['period']}</td>
                            </tr>

                            {/* Группа */}
                            <tr>
                                <td>{modalProps.langsMain['group']}</td>
                                <td>{modalProps.functionsDisplayData.getGroup(modalProps.element['group'])}</td>
                            </tr>

                            {/* Масса */}
                            <tr>
                                <td>{modalProps.langsMain['mass']}</td>
                                <td>{modalProps.functionsDisplayData.getWeight(modalProps.element['weight'], modalProps.element['exists_in_nature'])}</td>
                            </tr>

                            {/* Плотность */}
                            <tr>
                                <td>{modalProps.langsMain['Density']}</td>
                                <td>{modalProps.functionsDisplayData.getDensity(modalProps.element['density'])}</td>
                            </tr>

                            {/* Электроотрицательность */}
                            <tr>
                                <td>{modalProps.langsMain['E-negativity']}</td>
                                <td>{modalProps.functionsDisplayData.getDefault(modalProps.element['electronegativity'])}</td>
                            </tr>

                            {/* Атомный радиус */}
                            <tr>
                                <td>{modalProps.langsMain['Atomic radius']}</td>
                                <td>{modalProps.functionsDisplayData.getAtomicRadius(modalProps.element['radius'])}</td>
                            </tr>

                            {/* Температура плавления */}
                            <tr>
                                <td>{modalProps.langsMain['Melting point']}</td>
                                <td>{modalProps.functionsDisplayData.getTemperature(modalProps.element['melting_temperature'])}</td>
                            </tr>

                            {/* Температура кипения */}
                            <tr>
                                <td>{modalProps.langsMain['Boiling point']}</td>
                                <td>{modalProps.functionsDisplayData.getTemperature(modalProps.element['boiling_temperature'])}</td>
                            </tr>

                            {/* Период полураспада */}
                            <tr>
                                <td>{modalProps.langsMain['Half-life']}</td>
                                <td>{modalProps.functionsDisplayData.getHalfLifePeriod(modalProps.element['half-life_period'], modalProps.element['half-life_symbol'])}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <br/><br/>
                </div>
            </div>
        </div>
    );
};

export default Modal;