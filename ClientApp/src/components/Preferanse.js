import React, { Component } from "react";
import Card from "./Card";

export class Preferanse extends Component {
  static displayName = Preferanse.name;

  constructor(props) {
    super(props);
    this.state = { cards: [], loading: true };
  }

  componentDidMount() {
    this.populateCardsData();
  }

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      Preferanse.renderCards(this.state.cards)
    );

    return (
      <div>
        <h1 id="tabelLabel">Player1 cards</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  static renderCards(cards) {
    const flexDiv = {
      display: "flex",
      height: "200px",
    };
    return (
      <div style={flexDiv}>
        {cards.map((card) => (
          <div>
            <Card value={card.value} suit={card.suit}></Card>
          </div>
        ))}
      </div>
    );
  }

  async populateCardsData() {
    const response = await fetch("preferanse");
    const data = await response.json();
    this.setState({ cards: data, loading: false });
  }
}
