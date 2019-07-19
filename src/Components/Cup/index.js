import React from "react";
import styled from "styled-components";
import cupImg from "Assets/cup.svg";

const CupStyled = styled.div.attrs(({ transform, z, top }) => ({
  style: {
    transform,
    zIndex: z || 5,
    top
  }
}))`
  transition: 0s;
  display: block;
  width: 200px;
  position: fixed;
  left: calc(25vw - 100px);
  img {
    transform: rotate(180deg);
  }
  @media (max-width: 900px) {
    width: 100px;
    left: calc(20vw - 50px);
  }
`;

export default function Cup({
  x,
  z,
  cupId,
  reverse = false,
  factor = 1,
  lifted,
  click
}) {
  x = parseInt(x);
  const m = window.innerWidth < 900 ? 3 : 2.5;
  const calcLeft = () => `${(x * m) / 10}vw`;
  const calcTop = () => {
    let newX = reverse ? -x : x;
    let val = Math.sin((newX * Math.PI) / 100 / factor) * m * 10;
    return `${val.toFixed(20)}vh`;
  };
  const transform = lifted
    ? `translateX(${calcLeft()})`
    : `translate(${calcLeft()},${calcTop()})`;
  const top =
    window.innerWidth < 900
      ? `calc(${50 - lifted}vh - 50px)`
      : `calc(${50 - lifted}vh - 100px)`;

  return (
    <CupStyled
      onClick={click}
      transform={transform}
      z={z}
      top={top}
      id={cupId}
      reverse={reverse}
    >
      <img src={cupImg} alt="cup" />
    </CupStyled>
  );
}
