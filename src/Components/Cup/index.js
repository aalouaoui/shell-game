import React from "react";
import styled from "styled-components";
import cupImg from "Assets/cup.svg";

const CupStyled = styled.div`
  display: block;
  width: 200px;
  position: fixed;
  z-index: 5;
  left: ${({ x }) => x};
  top: ${({ y }) => y};
  img {
    transform: rotate(180deg);
  }
`;

export default function Cup({ x, cupId }) {
  x = parseInt(x);
  const calcLeft = () => `calc(${x * 20 + 30}% - 100px)`;
  const calcTop = () => `calc(${Math.sin(x % 1) * 5 + 50}% - 100px)`;

  return (
    <CupStyled x={calcLeft()} y={calcTop()} id={cupId}>
      <img src={cupImg} alt="cup" />
    </CupStyled>
  );
}
