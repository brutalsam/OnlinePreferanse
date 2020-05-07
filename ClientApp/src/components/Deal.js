import React, { Component } from "react";
import Card from "./Card";

export default class Deal extends Component {
  static displayName = Deal.name;

  constructor(props) {
    super(props);
    this.state = {
      cards: props.cards,
      playerName: props.playerName,
      selectedId: -1,
    };

    this.setActive = this.setActive.bind(this);
  }

  setActive(id)  {
    this.setState({ selectedId: id });
  }

  render() {
    return (
      <div>
        <h2 id="tabelLabel">{this.state.playerName}</h2>
        <div>{this.renderCards(this.state.cards)}</div>
      </div>
    );
  }

  renderCard(card, id) {
    return (
      <div onClick={() =>this.setActive(id)}>
        <Card
          value={card.value}
          suit={card.suit}
          isSelected={this.state.selectedId === id}
          key={card.id}
          
        ></Card>
      </div>
    );
  }

  renderCards(cards) {
    const flexDiv = {
      display: "flex",
      height: "200px",
    };
    return (
      <div style={flexDiv}>
        {cards.map((card, id) =>
          //   <div>
          //     <Card
          //       value={card.value}
          //       suit={card.suit}
          //       //selected={this.state.selectedId === card.id}
          //       key={card.id}
          //       //onClick={this.setActive(card.id)}
          //     ></Card>
          //   </div>
          this.renderCard(card, id)
        )}
      </div>
    );
  }
}
