import React from "react";
import styled from "styled-components";
import cupImg from "Assets/cup.svg";

const CupStyled = styled.div`
  display: block;
  width: 200px;
  position: fixed;
  z-index: 5;
  left: ${({ x }) => `calc(${x * 20 + 30}% - 100px)`};
  top: calc(50vh - 100px);
  img {
    transform: rotate(180deg);
  }
`;

export default function Cup({ x, cupId }) {
  return (
    <CupStyled x={x} id={`cup${cupId}`}>
      <img src={cupImg} alt="cup" />
    </CupStyled>
  );
}
