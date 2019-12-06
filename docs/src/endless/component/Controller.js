import React from "react";
import "./Controller.css";
import Switch from "react-switch";

const minBet = 0.01;
export default class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "1.05",
      bet: "1.00",
      chance: 98 / 1.05,
      win: 1.05,
      autoBet: false,
    };
    this.handleBetChange = this.handleBetChange.bind(this);
    this.handleBetBlur = this.handleBetBlur.bind(this);
    this.handleOddsChange = this.handleOddsChange.bind(this);
    this.handleOddsBlur = this.handleOddsBlur.bind(this);
    this.handleBetClick = this.handleBetClick.bind(this);
    this.handleAutoBetChange = this.handleAutoBetChange.bind(this);
  }

  handleBetChange(event) {
    var value = parseFloat(event.target.value);
    if (isNaN(value)) value = minBet;
    var v = value.toFixed(2);
    if (v < minBet) {
      v = minBet;
    }
    const win = (v * this.state.value).toFixed(4);
    this.setState({bet: event.target.value, win});
  }

  handleBetBlur(event) {
    var value = parseFloat(event.target.value);
    if (isNaN(value)) value = minBet;
    var v = value.toFixed(2);
    if (v < minBet) {
      v = minBet;
    }
    const win = (v * this.state.value).toFixed(4);
    this.setState({ bet: parseFloat(v), win });
  }

  handleOddsChange(event) {
    var value = parseFloat(event.target.value);
    if (isNaN(value)) value = 1.05;
    var v = value.toFixed(2);
    if (v < 1.05) {
      v = 1.05;
    } else if (v > 1000) {
      v = 1000.00;
    }
    const chance = 98 / v;
    const win = (v * this.state.bet).toFixed(4);
    this.setState(  { value: event.target.value, chance, win});
  }

  handleOddsBlur(event) {
    var value = parseFloat(event.target.value);
    if (isNaN(value)) value = 1.05;
    var v = value.toFixed(2);
    if (v < 1.05) {
      v = 1.05;
    } else if (v > 1000) {
      v = 1000.00;
    }
    const chance = 98 / v;
    const win = (v * this.state.bet).toFixed(4);
    this.setState({ value: v, chance, win });
  }

  handleBetClick(event){
    if (this.props.autoBet) {
      this.props.stopBet()
      return
    }
    this.props.onBet(parseFloat(this.state.value), parseFloat(this.state.bet), this.state.autoBet)
  }

  handleAutoBetChange = (autoBet) => {
    this.setState({autoBet});
  }

  render() {
    return (
      <div className="Controller">
        <div className="ControllerBody ControllerBet">
          <div>投注金额</div>
          <div>
            <input type="number" value={this.state.bet} onChange={this.handleBetChange} onBlur={this.handleBetBlur}/>
          </div>
        </div>
        <div className="ControllerBody ControllerOdds">
          <div>回报率(胜率{this.state.chance.toFixed(2)}%)</div>
          <div>
            <input
              type="number"
              value={this.state.value}
              onChange={this.handleOddsChange}
              onBlur={this.handleOddsBlur}
            />
          </div>
        </div>
        <div className="ControllerBody ControllerWin">
          <div>赢取奖金</div>
          <div>{this.state.win}</div>
        </div>
        <label>
            <span>自动下注</span>
            <Switch 
              onChange={this.handleAutoBetChange} 
              checked={this.state.autoBet} 
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
              className="react-switch"
              id="material-switch"/>
          </label>
        <div className="ControllerBody ControllerStart">
          <button onClick={this.handleBetClick} disabled={this.props.disableBet && !this.props.autoBet}>
            {this.props.autoBet ? "停止" : "下注"}
          </button>
        </div>
        <div>
          馀额 {this.props.balance}
        </div>
      </div>
    );
  }
}
