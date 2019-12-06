import React from 'react';
import Switch from "react-switch";

const step = 0.01;
const min = 0.01;
const style = {
  inputText:{ 
    fontSize: '30px',
    width: '140px',
  },
  button:{ 
    fontSize: '30px',
  },
  button2: {
    marginTop: '10px',
    marginBottom: '10px',
    fontSize: '30px',
  },
}

export default class Bet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
      autoBet: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleMore = this.handleMore.bind(this);
    this.handleLess = this.handleLess.bind(this);
  }

  handleChange(event) {
    var value = parseFloat(event.target.value);
    var v = value.toFixed(2);
    if (v < min){
      v = min;
    }
    this.props.onChange(v);
    this.setState({value: parseFloat(v)});
  }

  handleMore() {
    var value = parseFloat(this.state.value) + step;
    value = parseFloat(value.toFixed(2));
    this.props.onChange(value);
    this.setState({value});
  }

  handleLess() {
    var value = parseFloat(this.state.value) - step;
    if (value < 0.01) value = 0.01;
    value = parseFloat(value.toFixed(2));
    this.props.onChange(value);
    this.setState({value});
  }

  handleAutoBetChange = (autoBet) => {
    this.setState({autoBet});
  }

  handleBetClick = (event) => {
    event.preventDefault()
    this.props.onBet({bet:this.state.value, autoBet:this.state.autoBet})
  }

  render() {
    return(
      <div style={{display: 'grid'}}>
        <div style={{margin: 'auto'}}>
          <button style={style.button} onClick={this.handleMore}>
            +
          </button>
          {/* <form> */}
            <input type="number" style={style.inputText} value={this.state.value} onChange={this.handleChange} />
          {/* </form> */}
          <button style={style.button}  onClick={this.handleLess}>
            -
          </button>
        </div>
        <div style={{margin: 'auto'}}>
          <div>
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
          </div>
          <div style={{margin: 'auto'}}>
            <button style={style.button2} onClick={this.handleBetClick} disabled={this.props.disableBet}> 
              {this.props.callApi ? '停止': '下注'}
            </button>
          </div>
        </div>
        </div>
    )
  }
}