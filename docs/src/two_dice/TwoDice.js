import React from 'react';
import SelecteDice from './component/SelectDice';
import Balance from '../component/Balance';
import BetTimes from '../component/BetTimes';
import Odds from '../component/Odds';
import Chance from '../component/Chance';
import Bet from '../component/Bet';
import History from './component/History';

import logo from '../images/two_dice.png';

import '../css/Main.css';

import Scatter from '../eos/Scatter'

const chances = [2.78, 5.56, 8.33, 11.11, 13.89, 16.67, 13.89, 11.11, 8.33, 5.56, 2.78 ]

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      chance: chances[0],
      odds: 98 / chances[0],
      disableBet: false,
      history: [],
      amount: '0.0000 EOS',
      betTimes: 0,
      amountHistory: [],
      callApi: false
    };
    this.bet = 0.01
    this.autoBet = false
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
    Scatter.twoBet(bet, this.state.value, (result) => {
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
    Scatter.getTwoHistoryIndex( row =>{
      const start = row[0].key - 14;
      Scatter.getTwoHistory(start, result => {
        var history = []
        result.rows.forEach(element => {
          var numbers = []
          for (var i = 0; i < 12; i++) { 
            if (element.number & (1 << i)){
              numbers.push(1);
            } else {
              numbers.push(0);
            }
          }
          
          history.push({
            amount: element.bet / 10000,
            number: numbers,
            RandomResult: element.result + 2,
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
    if (value < 1) return
    var selectedCount = 0;
    var chance = 0;
    for (var i = 0; i < 11; i++) { 
      if (value & (1 << i)) {
        selectedCount++
        chance += chances[i]
      }
    }
    if (selectedCount > 10) return
    this.setState({...this.state, value, chance, odds: (98 / chance)})
  }

  render() {
    return (
      <div className="div1">
        <div className="div21">
          <div className="div31">
            <img src={logo} height={80} alt="Two Dice logo" className="GameLogo"/>
            <Balance value={this.state.amount} />
            <BetTimes value={this.state.betTimes} />
            <SelecteDice value={this.state.value} onChange={this.handleOnChange}/>
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
              < Odds odds={this.state.odds.toFixed(2)} />
            </div>
            <div>
              <Chance value={this.state.chance} />
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