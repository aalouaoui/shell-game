import React from "react";
import styled from "styled-components";
import cupImg from "Assets/cup.svg";

const CupStyled = styled.div`
  display: block;
  width: 200px;
  position: fixed;
  z-index: 5;
  left: ${props => `calc(${props.x}% - 100px)`};
  top: calc(50vh - 100px);
  img {
    transform: rotate(180deg);
  }
`;

export default function Cup(props) {
  return (
    <CupStyled {...props}>
      <img src={cupImg} alt="cup" />
    </CupStyled>
  );
}
