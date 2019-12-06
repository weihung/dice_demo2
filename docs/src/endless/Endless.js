import React from "react";
import "./Endless.css";
import PlayerList from "./component/PlayerList";
import Controller from "./component/Controller";
import Countdown from "./component/Countdown";
import BigText from "./component/BigText";
import Chart from "../component/Chart";

import Scatter from "../eos/Scatter";

export default class Endless extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disableBet: false,
      playerList: [],
      balance: "0.0000 EOS",
      betTimes: 0,
      status: 0,
      stopTime: 0,
      peroid: 0,
      startTime: 0,
      endTime: 0,
      drawData: [1],
      autoBet: false,
    };
    this.bet = 0.01;
    this.number = 1.05;
    this.result = 0;
    this.data = [];
    this.alreadyBet = false;

    this.handleBet = this.handleBet.bind(this)
    this.handleStopBet = this.handleStopBet.bind(this)
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.getBalance();
      this.getBetList();
    }, 1000);
    this.timeout = setTimeout(() => {
      this.getGameStatus();
    }, 1000);
  }

  componentWillUnmount() {
    this.shouldStop = true;
    clearInterval(this.interval);
    clearTimeout(this.timeout);
  }

  getBalance() {
    Scatter.getBalance(result => {
      const r = result[0].split(" ", 1);
      const amount = parseFloat(r);
      this.setState({ ...this.state, balance: result[0] });
      if (amount < parseFloat(this.bet)) {
        this.setState({autoBet: false});
      }
    });
  }

  getGameStatus() {
    // let startGame = false;
    Scatter.getGameStatus(result => {
      try {
        if (result.length === 0 || result[0].status === 2) {
          // Scatter.newGame(result => {
          //   if (startGame) return;
          //   startGame = true;
          //   this.getGameStatus();
          // });
          return;
        }
        var status = 0;
        if (Date.now() > result[0].startTime * 1000) {
          status = 1;
          if (!this.alreadyBet && this.state.autoBet) {
            this.alreadyBet = true;
            Scatter.endlessBet(this.bet, this.number * 100, ()=>{})
          }
        }
        if (Date.now() >= result[0].openTime * 1000) {
          status = 3;
          this.alreadyBet = false;
        } else if (Date.now() > result[0].endTime * 1000) {
          status = 2;
        }
        this.setState({
          startTime: result[0].startTime * 1000,
          endTime: result[0].endTime * 1000,
          peroid: result[0].key,
          status,
          drawData: [1]
        });
        if (status === 3) {
          this.getGameResult();
          return;
        }
        this.timeout = setTimeout(() => {
          this.getGameStatus();
        }, 1000);
      } catch (e) {
        console.log(e);
      }
    });
  }

  getGameResult() {
    clearTimeout(this.timeout);
    Scatter.getGameResult(result => {
      if (result.length < 1 || result[0].key !== this.state.peroid) {
        /*Scatter.rollDice(() => {
          this.timeout = setTimeout(() => {
            this.getGameResult();
          }, 1000);
        });*/
        this.timeout = setTimeout(() => {
          this.getGameResult();
        }, 1000);
        return;
      }
      this.result = result[0].result;
      this.data = [1];
      this.setState({status:4})
      this.startDraw();
    });
  }

  startDraw() {
    clearInterval(this.interval);
    const factory = 1.02;
    var last = this.data[this.data.length - 1];
    last = last * factory;
    var stop = false;
    if ((last * factory) > this.result / 100) {
      last = this.result / 100;
      stop = true;
      // if (this.data.length > 1) this.data = this.data.slice(0, this.data.length - 1)
    }
    last = last.toFixed(2)
    this.data.push(parseFloat(last));
    this.setState({ drawData: this.data });
    if (stop) {
      this.timeout = setTimeout(() => {
        this.getGameStatus()
        this.interval = setInterval(() => {
          this.getBalance();
          this.getBetList();
        }, 1000);
      }, 5000);
      
      return
    }
    this.timeout = setTimeout(() => {
      this.startDraw();
    }, 100);
  }

  getBetList(){
    if (this.state.status === 3) return
    Scatter.getBetList(playerList=>{
      this.setState({playerList})
    })
  }

  handleBet(odds, amount, autoBet){
    this.setState({autoBet})
    this.number = odds
    this.bet = amount
    this.alreadyBet = true;
    Scatter.endlessBet(amount, odds * 100, ()=>{})
  }

  handleStopBet(){
    this.setState({autoBet: false});
  }

  render() {
    return (
      <div className="Endless">
        <div className="EndlessLeft">
          <div className="EndlessChart">
            {this.state.status === 0 && <BigText value="准备中" />}
            {this.state.status === 1 && (
              <Countdown
                value={this.state.endTime}
                peroid={this.state.peroid}
                onFinish={() => {
                  this.setState({ status: 2 });
                }}
              />
            )}
            {this.state.status === 2 && <BigText value="停止下注" />}
            {this.state.status === 3 && <BigText value="停止下注" />}
            {this.state.status === 4 && <Chart value={this.state.drawData} />}
          </div>
          <div className="EndlessController">
            <Controller 
              disableBet={this.state.status !== 1} 
              onBet={this.handleBet} 
              autoBet={this.state.autoBet} 
              stopBet={this.handleStopBet} 
              balance={this.state.balance}
            />
          </div>
        </div>
        <div className="EndlessBetList">
          <PlayerList value={this.state.playerList} result={this.state.drawData[this.state.drawData.length - 1]}/>
        </div>
      </div>
    );
  }
}
