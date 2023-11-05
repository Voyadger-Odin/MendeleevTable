import React from 'react';
import './Loader.css';

const Loader = () => {

    const closeLoader = () => {
        const localObj = document.querySelector('.container-atom');
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

    setTimeout(() => {
        closeLoader()
    }, 1000)

    return (
        <div className="container-atom" open>
            <svg
                className="loader-atom"
                xmlnssvg="http://www.w3.org/2000/svg"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="406"
                height="358"
                viewBox="0 0 406 358"
            >
                <defs>
                    <radialGradient id="Rg"  >
                        <stop stopColor="#95006A" offset="0.25">
                            <animate
                                attributeName="stop-color"
                                dur="4s"
                                values="#95006A;#69009D;#95006A"
                                begin="0s"

                                repeatCount="indefinite"  />
                        </stop>
                        <stop stopColor="#69009D" offset="1">
                            <animate
                                attributeName="stop-color"
                                dur="2s"
                                values="#69009D;#95006A;#69009D"
                                begin="0s"

                                repeatCount="indefinite" />
                        </stop>


                    </radialGradient>
                </defs>

                <path className="core" d="m203.8 139.7c8.9-0.2 18.6 2.7 25.2 8.6 7.5 6.7 12.9 17.3 12.9 27.4-0.1 11.1-6.1 22.7-14.5 30-6.2 5.4-15.4 8.2-23.6 7.5-10.9-0.9-22.9-5.5-29.2-14.7-4.6-6.6-8.7-14.5-8.6-22.5 0.2-9.4 4.2-19.5 11-26 6.9-6.6 17.3-10 26.8-10.2zM279 29.9" className="s0"/>
                <path id="orbita_1" d="m279 29.9c24 6.8 23.5 39.1 21.8 60.5-2.1 26.4-10.5 47.3-19.3 69.7-7.3 18.7-17.4 36.3-27.8 53.5-9 14.9-18.7 29.5-29.6 43.1-10.4 12.9-21 25.9-33.8 36.5-13 10.7-27 21.5-43.1 26.6-7.7 2.4-17 5.2-24.2 1.5-10.6-5.4-17.4-18.5-19.1-30.3-4.3-29.8 4.6-60.3 14.5-88.5 9.5-26.8 19.3-42.7 31.3-62.7 12.2-20.3 25.1-40.4 41-57.9 13.2-14.6 27.3-29.1 44.5-38.6 13.3-7.4 30.1-17.1 43.6-13.3z" className="s0"/>

                <path id="orbita_2" d="m40.5 175.3c0.9-16.1 16.2-30.3 30.4-37.5 13.2-6.6 27.2-11.4 41.3-15.7 12.2-3.7 24.6-6.8 37.2-8.7 14-2.2 28.3-2.8 42.5-3.4 10.6-0.5 21.2-0.6 31.9-0.4 11.4 0.2 22.8 0.2 34.1 1.5 11.2 1.3 22.4 3.5 33.4 6.1 9.6 2.2 19.3 4.3 28.4 8 13.1 5.2 27.4 9.9 37.5 19.7 6.1 5.9 11.2 13.7 12.5 22 1.1 6.8-0.5 14.3-4.2 20.1-7.5 11.6-21.2 17.8-33.4 24.3-9.5 5.1-20 8.2-30.3 11.3-13.9 4.2-28.1 7.7-42.5 9.9-15.8 2.4-31.8 3-47.8 3.4-12 0.3-24-0.2-36-0.8-11.8-0.6-23.6-0.7-35.3-2.7-17.5-2.9-34.9-7.1-51.6-13.3C78.6 215.4 67.6 212 59.5 204.8 50.8 197 39.9 187 40.5 175.3Z" className="s0"/>
                <path id="orbita_3" d="m119.8 34.9c7.9-4.7 18.2-5.7 27.3-4.3 10.1 1.5 19.1 7.7 27.6 13.3 9.5 6.2 17.8 14.2 25.9 22.1 7 6.8 13.5 14.1 19.6 21.6 11.1 13.6 21.6 27.7 30.9 42.6 7.1 11.4 12.8 23.6 18.8 35.6 4.7 9.4 9.8 18.7 13.7 28.4 5.6 14.1 10.6 28.4 13.7 43.2 3 14.2 4.8 28.8 4.6 43.4-0.1 6.7-0.4 13.7-2.7 20-2.2 5.9-5.2 12.1-10.1 15.9-5.5 4.2-12.8 6.4-19.7 6.5-9.6 0-18.9-4.3-27.4-8.8-10.9-5.8-20-14.6-29.1-22.9-9.5-8.6-18.5-17.9-26.6-27.9-12.4-15.4-22.9-32.2-33.3-49-6.8-11.1-13.5-22.2-19-34-6.2-13.2-11.1-27-15.5-40.8-3.9-12-7.9-24.1-9.9-36.6-1.9-11.8-2.7-23.9-1.9-35.8 0.5-6.7 1-13.7 3.8-19.9 2.1-4.8 5-9.8 9.5-12.5z" className="s0"/>

                <circle className="circ" cx="0" cy="0" r="10"  >
                    <animateMotion dur="5s" repeatCount="indefinite">
                        <mpath xlinkHref="#orbita_1"/>
                    </animateMotion>

                </circle>

                <circle className="circ" cx="0" cy="0" r="10"  >
                    <animateMotion dur="5s" repeatCount="indefinite">
                        <mpath xlinkHref="#orbita_2"/>
                    </animateMotion>
                </circle>

                <circle className="circ" cx="0" cy="0" r="10"  >
                    <animateMotion dur="2s" repeatCount="indefinite">
                        <mpath xlinkHref="#orbita_3"/>
                    </animateMotion>
                </circle>
            </svg>
        </div>
    );
};

export default Loader;