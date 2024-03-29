import React, { Component } from "react";
import styled from "styled-components";
import Cup from "Components/Cup";
import Ball from "Components/Ball";
import StartScreen from "Components/StartScreen";

const Cont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: transparent;
  width: 100vw;
  height: 100vh;
  .info {
    display: block;
    position: fixed;
    top: 10px;
    color: #fff;
    width: 100%;
    left: 0;
    font-size: 4vh;
    text-shadow: 0px 0px 2px #888;
  }
`;

class Container extends Component {
  state = {
    gameMode: 0,
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
    ]
  };

  raiseCup = async cupId => {
    let cups = [...this.state.cups];
    for (let i = 0; i < 16; i++) {
      cups[cupId].lifted = i;
      await this.setState({ cups });
      await this.timeout(10);
    }
    return true;
  };

  lowerCup = async cupId => {
    let cups = [...this.state.cups];
    for (let i = 15; i >= 0; i--) {
      cups[cupId].lifted = i;
      await this.setState({ cups });
      await this.timeout(10);
    }
    return true;
  };

  startGame = async () => {
    await this.setState({ gameMode: 1 });
    await this.raiseCup(1);
    return true;
  };

  shuffleSequence = async () => {
    for (let i = 0; i < 10; i++) {
      let c1 = Math.floor(Math.random() * 3);
      let c2 = Math.floor(Math.random() * 3);
      while (c1 === c2) c2 = Math.floor(Math.random() * 3);
      await this.swapCups(c1, c2);
    }
    await this.setState({ gameMode: 2 });
    return true;
  };

  swapCups = async (cup1, cup2) => {
    let x1 = this.state.cups[cup1].x;
    let x2 = this.state.cups[cup2].x;
    let promises = [this.moveCup(x1, x2, cup1), this.moveCup(x2, x1, cup2)];
    return await Promise.all(promises);
  };

  timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

  moveCup = async (oldVal, newVal, cupId) => {
    let i = oldVal;
    const moveCycle = async () => {
      let cups = [...this.state.cups];
      let reverse = oldVal > newVal;

      cups.forEach(cup => (cup.z = cup.x % 100 === 0 ? 5 : cup.z));

      i = !reverse ? i + 2 : i - 2;
      cups[cupId].factor = Math.abs(newVal - oldVal) > 100 ? 2 : 1;
      cups[cupId].x = i;
      cups[cupId].reverse = reverse;
      cups[cupId].z = reverse ? 4 : 6;

      await this.setState({ cups });

      await this.timeout(10);
      if ((i < newVal && oldVal < newVal) || (i > newVal && oldVal > newVal)) {
        await moveCycle();
      } else {
        cups[cupId].x = newVal;
        await this.setState({ cups });
      }
      return true;
    };

    await moveCycle();
    return true;
  };

  cupClick = async (ev, cupId) => {
    const cupN = parseInt(cupId[3]);
    if (this.state.gameMode === 1) {
      await this.setState({ gameMode: 2 });
      await this.lowerCup(1);
      await this.timeout(100);
      await this.shuffleSequence();
      await this.setState({ gameMode: 3 });
      return true;
    }
    if (this.state.gameMode === 3) {
      await this.raiseCup(cupN);
      let gameWon = cupN === 1 ? 1 : 0;
      this.timeout(1000);
      if (!gameWon) {
        await this.timeout(1000);
        await this.raiseCup(1);
      }
      await this.setState({ gameMode: 4 + gameWon });
      return true;
    }
    if (this.state.gameMode > 3) {
      await this.setState({
        gameMode: 0,
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
        ]
      });
    }
  };

  render() {
    if (this.state.gameMode === 0)
      return (
        <Cont>
          <StartScreen click={this.startGame} />
        </Cont>
      );

    return (
      <Cont>
        <div id="game-container">
          <Ball visible={this.state.gameMode !== 2} x={this.state.cups[1].x} />
          {this.state.cups.map(cup => (
            <Cup
              {...cup}
              key={cup.cupId}
              click={ev => this.cupClick(ev, cup.cupId)}
            />
          ))}
          <span className="info">
            {this.state.gameMode === 1
              ? "Press any cup to start."
              : this.state.gameMode === 3
              ? "Where is the ball?"
              : this.state.gameMode === 4
              ? "Game Lost. Press any cup to restart"
              : this.state.gameMode === 5
              ? "Game Won. Press any cup to restart"
              : null}
          </span>
        </div>
      </Cont>
    );
  }
}

export default Container;
