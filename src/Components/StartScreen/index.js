import React from "react";
import styled from "styled-components";

const Div = styled.div`
  h1 {
    font-size: 20vh;
    color: #fff;
    font-weight: 100;
    position: relative;
  }
  span {
    display: block;
    border: solid 4px #fff;
    padding: 10px 40px;
    background: #fff;
    width: fit-content;
    margin: 10px auto;
    cursor: pointer;
    b {
      font-size: 10vh;
      color: transparent;
      background-clip: text;
      -webkit-background-clip: text;
      display: block;
      text-fill-color: transparent;
    }
  }
  span:hover {
    background: transparent;
    b {
      color: #fff;
    }
  }
`;
export default function StartScreen({ click }) {
  return (
    <Div id="start-screen">
      <h1 val="Thimblerig">Thimblerig</h1>
      <span onClick={click}>
        <b>Start</b>
      </span>
    </Div>
  );
}
