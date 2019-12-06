import React, { Component } from 'react'
import Slider from './component/Slider' 
import Balance from '../component/Balance';
import BetTimes from '../component/BetTimes';
import Odds from '../component/Odds';
import Chance from '../component/Chance';
import Bet from '../component/Bet';
import History from './component/History';

import logo from '../images/etheroll.png';

import '../css/Main.css';

import Scatter from '../eos/Scatter'

class Etheroll extends Component {
  constructor(props){
    super(props)
    this.bet = 0.01
    this.autoBet = false

    this.state = {
      value: 50,
      odds: 1.98,
      disableBet: false,
      history: [],
      amount: '0.0000 EOS',
      betTimes: 0,
      amountHistory: [],
      callApi: false
    }
  }
  
  componentDidMount() {
    this.interval = setInterval(() => {
      this.getBalance();
      this.getHistory();
    }, 1000)
  }

  componentWillUnmount() {
    this.shouldStop = true;
    clearInterval(this.interval)
  }

  onChange = value => {
    this.setState({ value, odds: 98 / value})
  }

  startBet(bet) {
    Scatter.etherollBet(bet, this.state.value, (result) => {
      this.setState({...this.state, betTimes: this.state.betTimes + 1});
      if (result === 500) this.shouldStop = true;
      if (!this.shouldStop && this.autoBet) {
        this.startBet(bet);
        return;
      }
      this.setState({...this.state, 
        disableBet: false,
        callApi: false,
      });
    });
  }

  getBalance(callback) {
    Scatter.getBalance(result => {
      const r = result[0].split(" ", 1)
      const amount = parseFloat(r)
      var amountHistory = [];
      try {
        amountHistory = this.state.amountHistory
      } catch (e) {
        console.log(e);
      }
      amountHistory.push(amount)
      this.setState({...this.state, amount: result[0], amountHistory});
      if (amount < parseFloat(this.bet)) {
        this.shouldStop = true;
      }
      try {
        callback(result[0]);
      } catch (e) {

      }
    })
  }

  getHistory() {
    Scatter.getEtherollHistoryIndex( row =>{
      const start = row[0].key - 14;
      Scatter.getEtherollHistory(start, result => {
        var history = []
        result.rows.forEach(element => {
          history.push({
            amount: element.bet / 10000,
            number: element.number,
            RandomResult: element.result,
            winamount: element.win / 10000,
          })
        })
        this.setState({...this.state, 
          history,
        });
      })
    });
  }
  
  handleOnBet = ({bet, autoBet}) => {
    var callApi = !this.state.callApi;
    this.shouldStop = !callApi;
    this.autoBet = autoBet;
    this.setState({...this.state, 
      disableBet: !autoBet,
      callApi: callApi,
    });
    this.startBet(bet)
  }

  render() {
    return (
      <div className="div1">
        <div className="div21">
          <div className="div31">
            <img src={logo} height={80} alt="Etheroll logo" className="GameLogo"/>
            <Balance value={this.state.amount} />
            <BetTimes value={this.state.betTimes} />
            <div style={{marginTop:'20px'}}>
              <Slider onChange={this.onChange} />
            </div>
            
            <Bet value={this.bet} disableBet={this.state.disableBet} callApi={this.state.callApi} onBet={this.handleOnBet} onChange={(value) => {
              this.bet = value;
            }}/>
          </div>
        
          <div className="div32">
            <div>
              < Odds odds={this.state.odds.toFixed(2)} />
            </div>
            <div>
              <Chance value={this.state.value} />
            </div>
          </div>

          <div className="div33">
            <History value={this.state.history} />
          </div>
        </div>
      </div>
    )
  }
}

export default Etheroll