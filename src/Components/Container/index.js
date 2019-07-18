import React, { useState, useEffect, useReducer } from "react";
import styled from "styled-components";
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

export default function Container(props) {
  let [cupsState, setCupsState] = useState([2, 0, 1]);

  /*
  const [time, dispatch] = useReducer((state = 0, action) => {
    if (action.type === "add") return state + 1;
    return state;
  });

  useEffect(() => {
    const timer = window.setInterval(() => {
      dispatch({ type: "add" });
    }, 1000);
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  (() => {

    let cupsCopy = [...cupsState];
    let c1 = Math.floor(Math.random() * cupsCopy.length);
    let c2 = Math.floor(Math.random() * cupsCopy.length);
    while (c1 === c2) c2 = Math.floor(Math.random() * cupsCopy.length);
    [cupsCopy[c1], cupsCopy[c2]] = [cupsCopy[c2], cupsCopy[c1]];
    setCupsState(cupsCopy);
  })();
  */

  return (
    <Cont>
      <Ball visible="1" position={cupsState.indexOf(1)} />
      {cupsState.map((val, key) => (
        <Cup x={key} cupId={val} key={key} />
      ))}
    </Cont>
  );
}
