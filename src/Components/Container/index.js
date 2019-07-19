import React, { Component } from "react";
import styled from "styled-components";
import Cup from "Components/Cup";
import Ball from "Components/Ball";

const Cont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
  width: 100vw;
  height: 100vh;
`;

class Container extends Component {
  state = {
    cups: [
      {
        cupId: "cup0",
        x: 0
      },
      {
        cupId: "cup1",
        x: 100
      },
      {
        cupId: "cup2",
        x: 200
      }
    ],
    ballVisible: true
  };

  componentDidMount() {}

  moveCup = (oldVal, newVal, cupId) => {
    let i = oldVal;
    const moveCycle = () => {
      i = oldVal < newVal ? i + 1 : i - 1;
      let cups = [...this.state.cups];
      cups[cupId].x = i;
      cups[cupId].reverse = oldVal > newVal;
      cups[cupId].factor = Math.abs(newVal - oldVal) > 100 ? 2 : 1;
      this.setState({ cups, ballVisible: false }, () => {
        if ((i < newVal && oldVal < newVal) || (i > newVal && oldVal > newVal))
          setTimeout(() => moveCycle(), 1);
        else {
          cups[cupId].x = newVal;
          setTimeout(() => this.setState({ cups, ballVisible: true }), 500);
        }
      });
    };
    moveCycle();
  };

  render() {
    return (
      <Cont>
        <div
          id="game-container"
          onClick={() => {
            this.moveCup(0, 200, 0);
            this.moveCup(200, 0, 2);
          }}
        >
          <Ball visible={this.state.ballVisible} x={this.state.cups[1].x} />
          {this.state.cups.map(cup => (
            <Cup {...cup} key={cup.cupId} />
          ))}
        </div>
      </Cont>
    );
  }
}

export default Container;
