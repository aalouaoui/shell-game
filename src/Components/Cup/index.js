import React from "react";
import styled from "styled-components";
import cupImg from "Assets/cup.svg";

const CupStyled = styled.div.attrs(({ x, y, reverse }) => ({
  style: {
    transform: `translate(${x},${y})`,
    zIndex: reverse ? 2 : 9
  }
}))`
  transition: 0s;
  display: block;
  width: 200px;
  position: fixed;
  left: calc(30vw - 100px);
  top: calc(50vh - 100px);
  img {
    transform: rotate(180deg);
  }
`;

export default function Cup({ x, cupId, reverse = false, factor = 1 }) {
  x = parseInt(x);
  const calcLeft = () => `${x / 5}vw`;
  const calcTop = () => {
    let newX = reverse ? -x : x;
    let val = Math.sin((newX * Math.PI) / 100 / factor) * 25;
    return `${val.toFixed(20)}vh`;
  };

  return (
    <CupStyled x={calcLeft()} y={calcTop()} id={cupId} reverse={reverse}>
      <img src={cupImg} alt="cup" />
    </CupStyled>
  );
}
