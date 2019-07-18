import React from "react";
import styled from "styled-components";
import turnPhone from "Assets/rotatePhone.png";

const Div = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 999;
  display: none;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h2{
      font-family: Arial, sans-serif;
      font-size: 26px;
      font-weight: 300;
      margin-top: 20px;
  }
  @media (orientation: portrait) {
    display: flex;
  }
`;
export default function Hider() {
  return (
    <Div>
      <img src={turnPhone} alt="turn" />
      <h2>Please rotate your phone</h2>
    </Div>
  );
}
