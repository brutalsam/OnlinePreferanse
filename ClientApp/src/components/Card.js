import React, { Component } from "react";


export default class Card extends Component {
  static displayName = Card.name;

  constructor(props) {
    super(props);
    this.state = { value: props.value, suit: props.suit, hover: false };
    if (!this.props.value) {
      throw new Error("please set [value] of a card");
    }
    if (!this.props.suit) {
      throw new Error("please set [suit] of a card");
    }
    this.toggleHover = this.toggleHover.bind(this);
  }

  toggleHover() {
    this.setState({ hover: !this.state.hover });
  }

  render() {
    const playingCard = {
      borderRadius: "25px",
      border: "2px solid #73AD21",
      padding: "20px",
      width: "105px",
      height: "140px",
      color: this.getCardColor(this.state.suit),
      fontSize: "40px",
      margin: "5px",
      marginTop: this.state.hover ? "20px" : "40px",
    };
    return (
      <div
        style={playingCard}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
      >
        <p>{this.getCardRepresentation(this.state)}</p>
      </div>
    );
  }

  getCardRepresentation(card) {
    return `${this.getValueName(card.value)}${this.getSuitSymbol(card.suit)}`;
  }

  getValueName(cardValue) {
    let valueName = "unknown";
    switch (cardValue) {
      case 11:
        valueName = "J";
        break;
      case 12:
        valueName = "Q";
        break;
      case 13:
        valueName = "K";
        break;
      case 14:
        valueName = "A";
        break;
      default:
        valueName = cardValue;
        break;
    }
    return valueName;
  }

  getSuitSymbol(suitNum) {
    let suitName = "unknown";
    switch (suitNum) {
      case 1:
        suitName = "♠";
        break;
      case 2:
        suitName = "♣";
        break;
      case 3:
        suitName = "♦";
        break;
      case 4:
        suitName = "♥";
        break;
      default:
        suitName = "Unknown";
        break;
    }
    return suitName;
  }
  getCardColor(suitNum) {
    let suitName = "green";
    switch (suitNum) {
      case 1:
      case 2:
        suitName = "black";
        break;
      case 3:
      case 4:
        suitName = "red";
        break;
      default:
        suitName = "black";
        break;
    }
    return suitName;
  }
}
