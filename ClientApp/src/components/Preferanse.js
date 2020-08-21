import React, { Component } from "react";
//  
import Bidding from "./Bidding";
import authService from "./api-authorization/AuthorizeService";

export class Preferanse extends Component {
  static displayName = Preferanse.name;

  constructor(props) {
    super(props);
    const { location } = this.props;
    this.state = { dame: null, loading: true, gameId: location.state };

    this.isLastDealHasContract = this.isLastDealHasContract.bind(this);
    this.renderDeals = this.renderDeals.bind(this);
  }

  componentDidMount() {
    this.populateCardsData();
  }

  isLastDealHasContract() {
    let lastDeal = this.state.game.deals[this.state.game.deals.length - 1];
    return lastDeal.dealContract !== null;
  }

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderDeals(this.state.game)
    );

    return (
      <div>
        <h1 id="tabelLabel">Game 1</h1>
        {contents}
      </div>
    );
  }

  renderDeals(game) {
    let contract = this.isLastDealHasContract() ? "HasContract" : <Bidding />;
    return (
      <div>
        {contract}
        {/*<Deal cards={game.player2.cards} playerName={game.player2.playerName}></Deal>
        <Deal cards={game.player3.cards} playerName={game.player3.playerName}></Deal>
        <Deal cards={game.player1.cards} playerName={game.player1.playerName}></Deal> */}
      </div>
    );
  }

  async populateCardsData() {
    const token = await authService.getAccessToken();
    const response = await fetch(`games?gameId=${this.state.gameId}`, {
      headers: !token ? {} : { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    this.setState({ game: data, loading: false });
  }
}
