import React, { Component } from 'react';
// import {getCardRepresentation, getSuitColor, getSuitName} from '../utils/cardUtils'

export class Preferanse extends Component {
  static displayName = Preferanse.name;

  constructor(props) {
    super(props);
    this.state = { cards: [], loading: true };
  }

  componentDidMount() {
    this.populateCardsData();
  }

  static getValueName(cardValue){
    let valueName = 'unknown';
    switch (cardValue) {
      case 7:
        valueName = '7'
        break;
      case 8:
        valueName = '8'
        break;
      case 9:
        valueName = '9'
        break;
      case 10:
        valueName = '10'
        break;
      case 11:
        valueName = 'J'
        break;
      case 12:
        valueName = 'Q'
        break;
      case 13:
        valueName = 'K'
        break;
      case 14:
        valueName = 'A'
        break;
      default:
        valueName = 'Unknown'
        break;
    };
    return valueName;
  }
  static getSuitName(suitNum){
    let suitName = 'unknown';
    switch (suitNum) {
      case 1:
        suitName = 'Spade ♠'
        break;
      case 2:
        suitName = 'Club ♣'
        break;
      case 3:
        suitName = 'Diamond ♦'
        break;
      case 4:
        suitName = 'Heart ♥'
        break;
      default:
        suitName = 'Unknown'
        break;
    };
    return suitName;
  }
  static getSuitSymbol(suitNum){
    let suitName = 'unknown';
    switch (suitNum) {
      case 1:
        suitName = '♠'
        break;
      case 2:
        suitName = '♣'
        break;
      case 3:
        suitName = '♦'
        break;
      case 4:
        suitName = '♥'
        break;
      default:
        suitName = 'Unknown'
        break;
    };
    return suitName;
  }

  static getSuitColor(suitNum){
    let suitName = 'green';
    switch (suitNum) {
      case 1:
      case 2:
        suitName = 'black'
        break;
      case 3:
      case 4:
        suitName = 'red'
        break;
      default:
        suitName = 'green'
        break;
    };
    return suitName;
  }

  static getCardRepresentation(card){
    return `${this.getValueName(card.value)}${this.getSuitSymbol(card.suit)}`;
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Preferanse.renderCardsTable(this.state.cards);

    return (
      <div>
        <h1 id="tabelLabel" >Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  static renderCardsTable(cards) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Value</th>
            <th>Suit</th>
            <th>Card representation</th>
          </tr>
        </thead>
        <tbody>
          {cards.map(card =>
            <tr>
              <td>{card.value}</td>
              <td style={{ color: this.getSuitColor(card.suit) }}>{this.getSuitName(card.suit)}</td>
              <td style={{ color: this.getSuitColor(card.suit) }}>{this.getCardRepresentation(card)}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }


  async populateCardsData() {
    const response = await fetch('preferanse');
    const data = await response.json();
    this.setState({ cards: data, loading: false });
  }

}
