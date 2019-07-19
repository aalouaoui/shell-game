import React from "react";
import styled from "styled-components";
import ballImg from "Assets/ball3.svg";

const BallStyled = styled.div.attrs(({ visible, x }) => ({
  style: {
    display: visible ? "block" : "none",
    transform: x
  }
}))`
  width: 60px;
  position: fixed;
  z-index: 199;
  top: calc(50vh + 30px);
  left: calc(30vw - 30px);
`;

export default function Ball({ visible, x }) {
  const getX = () => `translateX(${x / 5}vw)`;

  return (
    <BallStyled visible={visible} x={getX()}>
      <img src={ballImg} alt="ball" />
    </BallStyled>
  );
}
