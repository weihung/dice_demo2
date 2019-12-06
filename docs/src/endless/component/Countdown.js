import React from "react";
import "./Countdown.css";

export default class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.endTime = props.value;
    var second = (Date.now() - props.value) / 1000;
    if (second < 0) second = 0;
    this.state = {
      second
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.countdown();
    }, 123);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  countdown() {
    var second = (this.endTime - Date.now()) / 1000;
    if (second < 0) {
      second = 0;
      this.props.onFinish();
      return;
    }
    this.setState({ second });
  }

  render() {
    return (
      <div className="Countdown">
        <div className="Countdown-Text">
          <div style={{ margin: "auto", display:'grid' }}>
            <div style={{ margin: "auto"}}>第 {this.props.peroid} 轮</div>
            <div style={{ margin: "auto"}}>计时 {this.state.second.toFixed(3)} 秒</div>
          </div>
        </div>
      </div>
    );
  }
}
