import React from "react";
import styled from "styled-components";
import cupImg from "Assets/cup.svg";

const CupStyled = styled.div.attrs(({ x, y, z }) => ({
  style: {
    transform: `translate(${x},${y})`,
    zIndex: z || 5
  }
}))`
  transition: 0s;
  display: block;
  width: 200px;
  position: fixed;
  left: calc(25vw - 100px);
  top: calc(50vh - 100px);
  img {
    transform: rotate(180deg);
  }
`;

export default function Cup({ x,z, cupId, reverse = false, factor = 1 }) {
  x = parseInt(x);
  const calcLeft = () => `${x * 2.5 / 10}vw`;
  const calcTop = () => {
    let newX = reverse ? -x : x;
    let val = Math.sin((newX * Math.PI) / 100 / factor) * 25;
    return `${val.toFixed(20)}vh`;
  };

  return (
    <CupStyled x={calcLeft()} y={calcTop()} z={z} id={cupId} reverse={reverse}>
      <img src={cupImg} alt="cup" />
    </CupStyled>
  );
}
