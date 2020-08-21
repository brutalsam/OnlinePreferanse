import React, { PureComponent }  from "react";
import * as signalR from "@microsoft/signalr";
import authService from "./api-authorization/AuthorizeService";

export default class Bidding extends PureComponent {
  static displayName = Bidding.name;
  constructor(props) {
    super(props);
    this.state = {
      selectedContract: -1,
      selectedContractByUser: "",
      connection: null,
    };

    this.buttonClickHandler = this.buttonClickHandler.bind(this);
  }

  async buttonClickHandler(index) {
    const userName = await authService.getUser();
    this.state.connection
      .invoke(
        "ServerBiddingMessage",
        userName.preferred_username,
        index.toString()
      )
      .catch(function (err) {
        return console.error(err.toString());
      });
  }

  componentDidMount() {
    var connection = new signalR.HubConnectionBuilder()
      .withUrl("/biddingHub")
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connection.on("BiddingMessage", (user, message) => {
      var msg = message
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      this.setState({ selectedContract: msg, selectedContractByUser: user });
    });

    connection
      .start()
      .then(function () {
        console.log("Connection with biddingHub established");
      })
      .catch(function (err) {
        return console.error(err.toString());
      });

    this.setState({ connection });
  }

  static getSuitSymbol(suitNum) {
    let suitName = "unknown suit";
    switch (suitNum) {
      case 0:
        suitName = "♠";
        break;
      case 1:
        suitName = "♣";
        break;
      case 2:
        suitName = "♦";
        break;
      case 3:
        suitName = "♥";
        break;
      case 4:
        suitName = "NT";
        break;
      default:
        suitName = "Unknown";
        break;
    }
    return suitName;
  }

  static getCardName(index) {
    let cardName = "UNKNOWN";
    switch (true) {
      case index < 26:
        let suit = Bidding.getSuitSymbol(index % 5);
        let value = Math.floor(index / 5) + 6;
        cardName = `${value} ${suit}`;
        break;
      case index === 30:
        cardName = "Mieserre";
        break;
      case index === 40:
        cardName = "Pass";
        break;
      default:
        cardName = "case Unknown";
        break;
    }

    return cardName;
  }

  render() {
    const items = [];
    for (let i = 0; i < 25; i++) {
      if (i % 5 === 0 && i > 0) {
        items.push(<br />);
      }
      items.push(
        <button key={i} onClick={() => this.buttonClickHandler(i)}>
          {Bidding.getCardName(i)}
        </button>
      );
    }
    items.push(<br />);
    items.push(
      <button key="30" onClick={() => this.buttonClickHandler(30)}>
        Mieserre
      </button>
    );
    items.push(
      <button key="40" onClick={() => this.buttonClickHandler(40)}>
        Pass
      </button>
    );
    return (
      <div>
        <h1>BIDDING</h1>
        <p>
          Selected contract [{Bidding.getCardName(Number(this.state.selectedContract))}]
          by user [{this.state.selectedContractByUser}]
        </p>
        {items}
      </div>
    );
  }
}
