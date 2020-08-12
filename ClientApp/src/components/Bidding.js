import React, { Component } from "react";
import * as signalR from "@microsoft/signalr";

export default class Bidding extends React.PureComponent {
    static displayName = Bidding.name;
    constructor(props) {
        super(props);
        this.state = {
            selectedContract: -1,
            connection: null,
        };

        this.buttonClickHandler = this.buttonClickHandler.bind(this);
    }

    buttonClickHandler(index) {
        //this.setState({ selectedContract: index });
        console.log(`Selected Buttor with index ${index.toString()}`)
        this.state.connection.invoke("ServerBiddingMessage", "Sam", index.toString()).catch(function (err) {
            return console.error(err.toString());
        });
    }

    componentDidMount() {
        var connection = new signalR.HubConnectionBuilder()
            .withUrl("/biddingHub")
            // .ConfigureLogging(logging => {
            //     logging.SetMinimumLevel(signalR.LogLevel.Information);
            //     logging.AddConsole();
            // })
            .configureLogging(signalR.LogLevel.Information)
            .build();

        connection.on("BiddingMessage", function (user, message) {
            var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            var encodedMsg = user + " says " + msg;
            console.log(`got message ${encodedMsg}`);
            this.setState({ selectedContract: encodedMsg }.bind(this));
        });

        connection.start().then(function () {
            console.log("Connection with biddingHub established");
        }).catch(function (err) {
            return console.error(err.toString());
        });

        this.setState({ connection });
    }

    static getSuitSymbol(suitNum) {
        let suitName = "unknown";
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
        let suit = Bidding.getSuitSymbol(index % 5);
        let value = Math.floor(index / 5) + 6;
        return `${value} ${suit}`;
    }

    render() {
        const items = []
        for (let i = 0; i < 25; i++) {
            if (i % 5 == 0 && i > 0) {
                items.push(<br />);
            }
            items.push(<button key={i} onClick={() => this.buttonClickHandler(i)}>{Bidding.getCardName(i)}</button>)
        }
        items.push(<br />);
        items.push(<button key='30'>Mieserre</button>);
        items.push(<button key='40'>Pass</button>);
        return (
            <div>
                <h1>BIDDING</h1>
                <p>Selected card {Bidding.getCardName(this.state.selectedContract)}</p>
                {items}
            </div>
        );
    }


}