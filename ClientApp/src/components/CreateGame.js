import React, { Component } from "react";
import authService from "./api-authorization/AuthorizeService";
import { withRouter } from "react-router";

class CreateGame extends Component {
  static displayName = CreateGame.name;

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      userName: null,
      user1: "brutalsam@gmail.com",
      user2: "test1@gmail.com",
      user3: "test2@gmail.com",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log(this.props);
  }

  async populateState() {
    const [isAuthenticated, user] = await Promise.all([
      authService.isAuthenticated(),
      authService.getUser(),
    ]);
    this.setState({
      isAuthenticated,
      userName: user && user.name,
    });
  }

  componentDidMount() {
    this._subscription = authService.subscribe(() => this.populateState());
    this.populateState();
  }

  render() {
    const { isAuthenticated, userName } = this.state;
    if (!isAuthenticated) {
      return this.anonymousView();
    } else {
      return this.authenticatedView();
    }
  }

  handleChange(event) {
    var id = event.target.id;
    switch (id) {
      case "player1":
        this.setState({ user1: event.target.value });
        break;
      case "player2":
        this.setState({ user2: event.target.value });
        break;
      case "player3":
        this.setState({ user3: event.target.value });
        break;

      default:
        break;
    }
  }

  handleSubmit(event) {
    alert(
      "Отправленное имя: " +
        this.state.user1 +
        this.state.user2 +
        this.state.user3
    );
    event.preventDefault();
    const data = new FormData(event.target);

    data.set("Player1", this.state.user1);
    data.set("Player2", this.state.user2);
    data.set("Player3", this.state.user3);

    const token = authService.getAccessToken();
    fetch("games", {
      headers: !token ? {} : { Authorization: `Bearer ${token}` },
      method: "POST",
      body: data,
    });

    // const { history } = this.props;
    // history.push("/gamesList");
    window.location.reload();
};

  authenticatedView() {
    const divStyle = {
      borderStyle: "solid",
    };
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Create Game:</label>
        <div>
          <label>
            Player1 email
            <input
              label="User1"
              id="player1"
              type="text"
              value={this.state.user1}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Player2 email
            <input
              label="User2"
              id="player2"
              type="text"
              value={this.state.user2}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Player3 email
            <input
              label="User3"
              id="player3"
              type="text"
              value={this.state.user3}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <input type="submit" value="Отправить" />
      </form>
    );
  }

  anonymousView() {
    const divStyle = {
      borderStyle: "solid",
    };
    return (
      <div style={divStyle}>
        <h1>Anonymous Create New game!</h1>
        <button className="btn btn-primary">Create</button>
        <button className="btn btn-primary">Cancel</button>
      </div>
    );
  }
}

export default withRouter(CreateGame);