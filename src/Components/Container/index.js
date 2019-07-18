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
  let [cupsState, setCupsState] = useState({ cup0: 0, cup1: 1, cup2: 2 });
  const [time, setTime] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(time + 1);
    }, 1000);

    if (count < 10) {
      let cupsCopy = { ...cupsState };
      let c1 = "cup" + Math.floor(Math.random() * 3);
      let c2 = "cup" + Math.floor(Math.random() * 3);
      while (c1 === c2) c2 = "cup" + Math.floor(Math.random() * 3);
      [cupsCopy[c1], cupsCopy[c2]] = [cupsCopy[c2], cupsCopy[c1]];
      setCupsState(cupsCopy);
      setCount(count + 1);
    }

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  const ballVisiblity = count > 10 || count === 0 ? 1 : 0;
  return (
    <Cont>
      <Ball visible={ballVisiblity} position={cupsState.cup1} />
      {Object.keys(cupsState).map(val => (
        <Cup x={cupsState[val]} cupId={val} key={val} />
      ))}
    </Cont>
  );
}
