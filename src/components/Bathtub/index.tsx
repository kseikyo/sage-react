import React, { useEffect, useState } from "react";
import "./styles.css";

import Water, { waterProps } from "../Water";
import { sleep } from "../../utils/sleep";

interface bathtubProps {
  fillingWater: boolean;
}

const Bathtub: React.FC<bathtubProps> = ({ fillingWater }) => {
  const [waterLevel, setWaterLevel] = useState(0);
  const [waterDivs, setWaterDivs] = useState<waterProps[]>([]);

  useEffect(() => {
    // When the component renders, it checks if the state of
    // fillinWater is either false or true, along side the water level
    // that must be between 0 and 5 inclusive

    if (!fillingWater && waterLevel > 0) {
      // Create a copy of the waterDivs array and remove the last element;
      const newWaterDivs = waterDivs.slice();
      newWaterDivs.length = newWaterDivs.length - 1;

      // Decreasing water level every 2 seconds
      sleep(2000).then((_) => {
        setWaterLevel(waterLevel - 1);
        setWaterDivs(newWaterDivs);
      });
    }
    if (fillingWater && waterLevel < 5) {
      // Create a copy of the waterDivs array and append a new element;
      const newWaterDivs = waterDivs.slice();
      newWaterDivs.push(<Water key={newWaterDivs.length} />);
      // NOTE: The key logic is not a great approach, it is just for demo purposes
      // I always use real ids or uuids when possible

      // Increasing water level every 2 seconds
      sleep(2000).then((_) => {
        setWaterLevel(waterLevel + 1);
        setWaterDivs(newWaterDivs);
      });
    }
  }, [waterLevel, fillingWater, waterDivs]);

  return (
    <>
      <div className="bathtub">{waterDivs}</div>
      <span>Water counter: {waterLevel * 20}</span>
    </>
  );
};

export default Bathtub;
