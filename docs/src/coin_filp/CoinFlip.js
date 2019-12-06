import React from 'react';
import SelectCoin from './component/SelectCoin';
import Balance from '../component/Balance';
import BetTimes from '../component/BetTimes';
import Odds from '../component/Odds';
import Chance from '../component/Chance';
import Bet from '../component/Bet';
import History from './component/History';

import logo from '../images/coin_flip.png';

import '../css/Main.css';

import Scatter from '../eos/Scatter'

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.bet = 0.01
    this.autoBet = false

    this.state = {
      value: 0,
      disableBet: false,
      history: [],
      amount: '0.0000 EOS',
      betTimes: 0,
      amountHistory: [],
      callApi: false
    };
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

  handleAutoBetChange = (checked) => {
    this.setState({...this.state, autoBet: checked});
  }

  startBet(bet) {
    Scatter.coinBet(bet, this.state.value, (result) => {
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
    Scatter.getCoinHistoryIndex( row =>{
      const start = row[0].key - 14;
      Scatter.getCoinHistory(start, result => {
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

  handleOnChange = value => {
    this.setState({...this.state, value})
  }

  render() {
    return (
      <div className="div1">
        <div className="div21">
          <div className="div31">
            <img src={logo} height={80} alt="Two Dice logo" className="GameLogo"/>
            <Balance value={this.state.amount} />
            <BetTimes value={this.state.betTimes} />
            <SelectCoin value={this.state.value} onChange={this.handleOnChange}/>
            <Bet value={this.bet} 
              disableBet={this.state.disableBet} 
              callApi={this.state.callApi} 
              onBet={this.handleOnBet} 
              onChange={(value) => {
                this.bet = value;
              }}
            />
          </div>
          <div className="div32">
            <div>
              < Odds odds={1.98} />
            </div>
            <div>
              <Chance value={50} />
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