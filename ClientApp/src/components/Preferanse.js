import React, { Component } from "react";
import Deal from "./Deal"
import authService from './api-authorization/AuthorizeService';

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
      Preferanse.renderDeals(this.state.game)
    );

    return (
      <div>
        <h1 id="tabelLabel">Game 1</h1>
        {contents}
      </div>
    );
  }

  static renderDeals(game) {
    const flexDiv = {
      display: "flex",
    };
    return (
      <div>
        <Deal cards={game.player2.cards} playerName={game.player2.playerName}></Deal>
        <Deal cards={game.player3.cards} playerName={game.player3.playerName}></Deal>
        <Deal cards={game.player1.cards} playerName={game.player1.playerName}></Deal>
      </div>
    );
  }

  async populateCardsData() {


    // const token = await authService.getAccessToken();
    // const response = await fetch('weatherforecast', {
    //   headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    // });
    // const data = await response.json();
    // this.setState({ forecasts: data, loading: false });

    const token = await authService.getAccessToken();
    const response = await fetch("preferanse", {
      headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    this.setState({ game: data, loading: false });
  }
}
