import React, { useState } from "react";
import Bathtub from "./components/Bathtub/";

import "./global.css";

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  const [fillingWater, setFillingWater] = useState(false);

  return (
    <>
      <main>
        <Bathtub fillingWater={fillingWater} />
        <div className="container">
          <button
            onClick={() => {
              setFillingWater(true);
            }}
          >
            Increase water level!
          </button>
          <button
            onClick={() => {
              setFillingWater(false);
            }}
          >
            Decrease water level!
          </button>
        </div>
      </main>
      <p>This is not for comercial use.</p>
    </>
  );
};

export default App;
