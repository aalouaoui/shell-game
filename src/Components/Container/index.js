import React from "react";
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
  return (
    <Cont>
      <Cup x="30" />
      <Ball x="0" visible="1" position="2"/>
      <Cup x="50"/>
      <Cup x="70"/>
    </Cont>
  );
}
