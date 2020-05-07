import React, { Component } from "react";
import Card from "./Card";

export default class Deal extends Component {
  static displayName = Deal.name;

  constructor(props) {
    super(props);
    this.state = {
      cards: props.cards,
      playerName: props.playerName,
    };
  }

  //   render() {
  //     return (
  //       <div>
  //         <h1 id="tabelLabel">{this.state.playerName} cards</h1>
  //         {Deal.renderCards(this.state.cards)}
  //       </div>
  //     );
  //   }
  render() {
    return Deal.renderCards(this.state.cards);
  }

  static renderCards(cards) {
    const flexDiv = {
      display: "flex",
      height: "200px",
    };
    return (
      <div id="cardsDeal">
        <h2 id="tabelLabel">Palyer 1</h2>
        <div style={flexDiv}>
          {cards.map((card) => (
            <div>
              <Card value={card.value} suit={card.suit}></Card>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
