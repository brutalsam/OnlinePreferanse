import React, { Component } from "react";

export default class TableRow extends React.PureComponent {
  static displayName = TableRow.name;

  constructor(props) {
    super(props);
    this.state = {
      values: props.values,
      hover: false,
      isSelected: props.isSelected,
      setActiveFunc: props.setActiveFunc,
    };

    this.toggleHover = this.toggleHover.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.isSelected !== prevProps.isSelected) {
      this.setState({ isSelected: this.props.isSelected });
    }
  }

  toggleHover() {
    this.setState({ hover: !this.state.hover });
  }

  render() {
    const tableRowStyle = {
      backgroundColor:
        this.state.hover || this.state.isSelected ? "lightblue" : "white",
    };
    return (
      <tr
        onClick={() => this.state.setActiveFunc(this.state.values[0])}
        style={tableRowStyle}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
      >
        {this.state.values.map((value) => (
          <td>{value}</td>
        ))}
      </tr>
    );
  }
}