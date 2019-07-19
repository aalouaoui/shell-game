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
        x: 0,
        lifted: 0
      },
      {
        cupId: "cup1",
        x: 100,
        lifted: 0
      },
      {
        cupId: "cup2",
        x: 200,
        lifted: 0
      }
    ],
    ballVisible: true
  };

  liftCup = async cupId => {
    let cups = [...this.state.cups];
    for (let i = 0; i < 16; i++) {
      cups[cupId].lifted = i;
      await this.setState({ cups });
      await this.timeout(10);
    }
    return true;
  };

  raiseCup = async cupId => {
    let cups = [...this.state.cups];
    for (let i = 15; i >= 0; i--) {
      cups[cupId].lifted = i;
      await this.setState({ cups });
      await this.timeout(10);
    }
    return true;
  };

  async componentDidMount() {
    await this.liftCup(1);
    await this.timeout(1000);
    await this.raiseCup(1);
    await this.timeout(1000);

    let promises = [this.moveCup(100, 200, 1), this.moveCup(200, 100, 2)]
    await Promise.all(promises);
    
    await this.timeout(2000);
    promises = [this.moveCup(0, 200, 0), this.moveCup(200, 0, 1)]
    await Promise.all(promises);
    
  }

  timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

  moveCup = async (oldVal, newVal, cupId) => {
    let i = oldVal;
    const moveCycle = async () => {
      i = oldVal < newVal ? i + 1 : i - 1;
      let cups = [...this.state.cups];
      cups.forEach(cup => {
        if (cup.x % 100 === 0) cup.z = 5;
      });
      cups[cupId].x = i;
      cups[cupId].reverse = oldVal > newVal;
      cups[cupId].z = oldVal > newVal ? 4 : 6;
      cups[cupId].factor = Math.abs(newVal - oldVal) > 100 ? 2 : 1;
      await this.setState({ cups, ballVisible: false });

      if ((i < newVal && oldVal < newVal) || (i > newVal && oldVal > newVal)) {
        await this.timeout(1);
        await moveCycle();
      } else {
        await this.timeout(500);
        cups[cupId].x = newVal;
        await this.setState({ cups, ballVisible: true });
      }
      return true;
    };

    await moveCycle();
    return true;
  };

  render() {
    return (
      <Cont>
        <div id="game-container">
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
