import React, {useState, useRef} from "react";

import './assets/styles/jetbrains.css';
import './assets/styles/jetbrains-components.css';


import MendeleevTable from "./components/MendeleevTable/MendeleevTable";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Body from "./components/Body/Body";
import Glossary from "./components/Glossary/Glossary";

import { useReactToPrint } from "react-to-print";
import ComponentToPrint from "./components/ComponentToPrint/ComponentToPrint";
import Loader from "./components/Loader/Loader";

function App() {
    const [theme, setTheme] = useState('dark'); // light dark
    const [locale, setLocale] = useState('ru');
    const [temperatureMode, setTemperatureMode] = useState('c');
    const [tableDisplay, setTableDisplay] = useState('Normal mode')

    const componentRef = useRef();
    const handlePrint  = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Mendeleev table',
    });

    const headerProps = {
        locale: locale,
        setLocale: setLocale,
        temperatureMode: temperatureMode,
        setTemperatureMode: setTemperatureMode,
        handlePrint: handlePrint,
    }

    const mendeleevTableProps = {
        locale: locale,
        temperatureMode: temperatureMode,
        tableDisplay: tableDisplay,
        setTableDisplay: setTableDisplay,
    }

  return (
      <div className={((theme === 'dark') ? "theme-dark" : "")}>
          <div className={"page"}>
              <Header headerProps={headerProps} />

              {/* Print element */}
              <div style={{ display: "none" }}>
                  <ComponentToPrint
                      ref={componentRef}
                      theme={theme}
                      mendeleevTableProps={mendeleevTableProps}
                  />
              </div>

              <Body>
                  <MendeleevTable mendeleevTableProps={mendeleevTableProps} />

                  <Glossary locale={locale}/>
              </Body>


              <Footer locale={locale}/>

              <Loader/>
          </div>
      </div>
  );
}

export default App;
