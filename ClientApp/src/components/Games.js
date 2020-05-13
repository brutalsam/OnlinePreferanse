import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'

export class GamesList extends Component {
  static displayName = GamesList.name;

  constructor(props) {
    super(props);
    this.state = { games: [], loading: true };
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  static renderGamesTable(games) {
    console.log(games)
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>GameId</th>
            <th>Player1</th>
            <th>Player2</th>
            <th>Player3</th>
            {/* <th>Creation date</th> */}
          </tr>
        </thead>
        <tbody>
          {games.map(game =>
            <tr key={game.Id}>
              <td>{game.id}</td>
              <td>{game.player1.playerName}</td>
              <td>{game.player2.playerName}</td>
              <td>{game.player3.playerName}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : GamesList.renderGamesTable(this.state.games);

    return (
      <div>
        <h1 id="tabelLabel" >Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateWeatherData() {
    const token = await authService.getAccessToken();
    const response = await fetch('games', {
      headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    this.setState({ games: data, loading: false });
    console.log(data);
  }
}
