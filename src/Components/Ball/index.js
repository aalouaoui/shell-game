import React from "react";
import styled from "styled-components";
import ballImg from "Assets/ball3.svg";

const BallStyled = styled.div`
  width: 60px;
  display: ${props => (props.visible ? "block" : "none")};
  position: fixed;
  z-index: 199;
  top: calc(50vh + 30px);
  left: ${({ leftVal }) => leftVal};
`;

export default function Ball({ visible, position }) {
  const getX = () => `calc(${30 + parseInt(position) * 20}vw - 30px)`;

  return (
    <BallStyled visible={visible} leftVal={getX()}>
      <img src={ballImg} alt="ball" />
    </BallStyled>
  );
}
