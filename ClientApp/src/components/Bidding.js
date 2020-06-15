import React, { Component } from "react";

export default class Bidding extends React.PureComponent {
    static displayName = Bidding.name;
    constructor(props) {
        super(props);
        this.state = {
            selectedContract: -1,
        };

        this.buttonClickHandler = this.buttonClickHandler.bind(this);
    }

    buttonClickHandler(index) {
        this.setState({ selectedContract: index });
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
        console.log(items);
        return (
            <div>
                <h1>BIDDING</h1>
                <p>Selected card {Bidding.getCardName(this.state.selectedContract)}</p>
                {items}
            </div>
        );
    }


}