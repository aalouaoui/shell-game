import React from "react";
import styled from "styled-components";
import ballImg from "Assets/ball3.svg";

const BallStyled = styled.div.attrs(({ visible, transform }) => ({
  style: {
    display: visible ? "block" : "none",
    transform
  }
}))`
  width: 60px;
  position: fixed;
  z-index: 1;
  top: calc(50vh + 30px);
  left: calc(25vw - 30px);
  @media (max-width: 900px) {
    top: calc(50vh + 15px);
    left: calc(20vw - 15px);
    width: 30px;
  }
`;

export default function Ball({ visible, x }) {
  const m = window.innerWidth < 900 ? 3 : 2.5;
  const getX = () => `translateX(${(x * m) / 10}vw)`;

  return (
    <BallStyled visible={visible} transform={getX()}>
      <img src={ballImg} alt="ball" />
    </BallStyled>
  );
}
