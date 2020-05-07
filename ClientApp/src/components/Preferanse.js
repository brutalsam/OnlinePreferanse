import React, { Component } from "react";
import Deal from "./Deal"

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
        <h1 id="tabelLabel">Game 1</h1>
        {contents}
      </div>
    );
  }

  static renderCards(cards) {
    const flexDiv = {
      display: "flex",
    };
    return (
      <div>
        <Deal cards={cards} playerName="Sam Hzhesiak"></Deal>
      </div>
    );
  }

  async populateCardsData() {
    const response = await fetch("preferanse");
    const data = await response.json();
    this.setState({ cards: data, loading: false });
  }
}
