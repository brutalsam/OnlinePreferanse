import React, { Component } from "react";
import TableRow from "./TableRow";
import CreateGame from "./CreateGame";
import authService from "./api-authorization/AuthorizeService";
// import Button from 'react-bootstrap/Button';

export class GamesList extends Component {
  static displayName = GamesList.name;

  constructor(props) {
    super(props);
    this.state = { games: [], loading: true, selectedId: "dummy", isCreateGameVisible: false };
    this.setActive = this.setActive.bind(this);
    this.createGameHandler = this.createGameHandler.bind(this);
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  createGameHandler() {
    let isVisible = !this.state.isCreateGameVisible;
    this.setState({ isCreateGameVisible: isVisible });
  }

  setActive(id) {
    console.log(id)
    console.log(this.state.selectedId)
    if (this.state.selectedId == id) {
      this.setState({ selectedId: "dummy" });
    } else this.setState({ selectedId: id });
  }

  renderRow(game) {
    return (
        <TableRow
          values={[
            game.id,
            game.player1.playerName,
            game.player2.playerName,
            game.player3.playerName,
          ]}
          isSelected={this.state.selectedId === game.id}
          key={game.id}
          setActiveFunc={ this.setActive}
        />
    );
  }

  renderGamesTable(games) {
    return (
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>GameId</th>
            <th>Player1</th>
            <th>Player2</th>
            <th>Player3</th>
            {/* <th>Creation date</th> */}
          </tr>
        </thead>
        <tbody>{games.map((game) => this.renderRow(game))}</tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderGamesTable(this.state.games)
    );

    let createGame = this.state.isCreateGameVisible ? (
      <CreateGame/>
    ) : (
      ""
    );

    return (
      <div>
        <h1 id="tabelLabel">Active game rooms</h1>
        <div>
          <button type="button" onClick={this.createGameHandler}>Create Game</button>
          {createGame}
        </div>
        {contents}
      </div>
    );
  }

  async populateWeatherData() {
    const token = await authService.getAccessToken();
    const response = await fetch("games", {
      headers: !token ? {} : { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    this.setState({ games: data, loading: false });
    console.log(data);
  }
}
