import React, { Component } from "react";
import Deal from "./Deal"

export class Preferanse extends Component {
  static displayName = Preferanse.name;

  constructor(props) {
    super(props);
    this.state = { dame: null, loading: true };
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
      Preferanse.renderCards(this.state.game.player1)
    );

    return (
      <div>
        <h1 id="tabelLabel">Game 1</h1>
        {contents}
      </div>
    );
  }

  static renderCards(player) {
    const flexDiv = {
      display: "flex",
    };
    return (
      <div>
        <Deal cards={player.cards} playerName={player.playerName}></Deal>
      </div>
    );
  }

  async populateCardsData() {
    const response = await fetch("preferanse");
    const data = await response.json();
    this.setState({ game: data, loading: false });
  }
}
