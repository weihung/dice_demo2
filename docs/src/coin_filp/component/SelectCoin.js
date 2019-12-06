import React, { Component } from "react";

import king from "./images/king.png";
import king_selected from "./images/king_selected.png";
import queen from "./images/pound.png";
import queen_selected from "./images/pound_selected.png";
import "./SelectCoin.css";

export default class SelectCoin extends Component {
  handleOnClick = value => {
    this.props.onChange(value);
  };

  render() {
    return (
      <div style={{ margin: "auto", display: "grid" }}>
        <div style={{ margin: "auto" }}>
          <img
            src={this.props.value ? king : king_selected}
            className="Coin "
            alt="king"
            onClick={() => this.handleOnClick(0)}
          />
          <img
            src={this.props.value ? queen_selected : queen}
            className="Coin "
            alt="queen"
            onClick={() => this.handleOnClick(1)}
          />
        </div>
      </div>
    );
  }
}
