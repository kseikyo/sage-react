import { type NextPage } from "next";
import { useEffect, useState, useMemo } from "react";
import { useAutoAnimate } from '@formkit/auto-animate/react'

/**
 *
 *
 * The component (the whole App) is a bathtub div that fills with water when you press the increaseWaterLevel button.
 * Starting with water level 0, once you press the button, every 2 seconds, a new blue-colored div is added inside the 
 * bathtub div (but is only 20 pixels high).  After the level reaches the height of the div (100 pixels; or 5 levels), 
 * he water stops filling.
 *
 * When you press the decreaseWaterLevel button, every 2 seconds, the water decreases by a div of the same height. The
 * water counter shows the height of the water in the div.
 */

const Home: NextPage = () => {
  const [isFillingUp, setIsFillingUp] = useState(true);
  const [waterLevel, setWaterLevel] = useState(0)

  const [parent,_] = useAutoAnimate({
  })
  const waterArray = useMemo(() => Array(waterLevel).fill(0), [waterLevel]);

  useEffect(() => {
    /**
      * This will be rerun everytime the waterLevel or isFillingUp changes
      * So it's better to use setTimeout instead of hacking with setInterval
      */
    let timeout: ReturnType<typeof setTimeout>;
    if (isFillingUp && waterLevel < 5) {
      timeout = setTimeout(() => {
        setWaterLevel((oldLevel) => oldLevel + 1);
      }, 2000)
    }

    if (!isFillingUp && waterLevel > 0) {
      timeout = setTimeout(() => {
        setWaterLevel((oldLevel) => oldLevel - 1);
      }, 2000)
    }

    return () => {
      clearTimeout(timeout);
    }
  }, [isFillingUp, waterLevel]);

  return (
    <main className="mx-auto flex flex-col items-center justify-center w-screen h-screen bg-gray-900 text-gray-400">
      <div ref={parent} className="container p-2 py-1 bg-[#c0c0c0] min-h-[100px] flex justify-end flex-col">
        {waterArray.map((_, idx) => (
          <div key={idx} className="water bg-blue-600 w-full h-[20px]">
          </div>
        ))}
      </div>
      <div className="flex items-center gap-6 mt-4">
        <button
          type="button"
          className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          onClick={() => setIsFillingUp(true)}>
          Increase water level
        </button>

        <button
          type="button"
          className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          onClick={() => setIsFillingUp(false)}>
          Decrease water level
        </button>
      </div>
      <p>
        Is increasing = {isFillingUp ? "true" : "false"}
      </p>
      <p>
        Current water level = {waterLevel}
      </p>
    </main>
  );
};

export default Home;
