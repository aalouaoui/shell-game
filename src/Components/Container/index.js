import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import Anime from "animejs";
import Cup from "Components/Cup";
import Ball from "../Ball";

const Cont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
  width: 100vw;
  height: 100vh;
`;

export default function Container() {
  let [cupsState, setCupsState] = useState([2, 0, 1]);
  const [time, setTime] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(time + 1);
    }, 1000);

    if (count < 10) {
      let cupsCopy = [...cupsState];
      let c1 = Math.floor(Math.random() * cupsCopy.length);
      let c2 = Math.floor(Math.random() * cupsCopy.length);
      while (c1 === c2) c2 = Math.floor(Math.random() * cupsCopy.length);
      [cupsCopy[c1], cupsCopy[c2]] = [cupsCopy[c2], cupsCopy[c1]];
      setCupsState(cupsCopy);
      setCount(count + 1);
    }

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  return (
    <Cont>
      <Ball visible="1" position={cupsState[1]} />
      {cupsState.map((val, key) => (
        <Cup x={val} cupId={key} key={key} />
      ))}
    </Cont>
  );
}
