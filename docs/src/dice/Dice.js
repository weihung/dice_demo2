import React from 'react';
import SelectDice from './component/SelectDice';
import Balance from '../component/Balance';
import BetTimes from '../component/BetTimes';
import Odds from '../component/Odds';
import Chance from '../component/Chance';
import Bet from '../component/Bet';
import History from './component/History';

import logo from '../images/dice.png';
import '../css/Main.css';

import Scatter from '../eos/Scatter'

const odds = [0, 5.88, 2.94, 1.96, 1.47, 1.16]

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.bet = 0.01
    this.autoBet = false

    this.state = {
      selected: 1,
      selectedCount: 1,
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
    // clearTimeout(this.timeout)
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

  startBet(bet) {
    Scatter.diceBet(bet, this.state.selected, (result) => {
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

  getHistory() {
    Scatter.getDiceHistoryIndex(row => {
      const start = row[0].key - 15;
      Scatter.getDiceHistory(start, result => {
        var history = []
        result.rows.forEach(element => {
          var number = []
          for (var i = 0; i < 6; i++) { 
            if (element.number& (1 << i)){
              number.push(1);
            } else {
              number.push(0);
            }
          }
          history.push({
            amount: element.bet / 10000,
            number,
            RandomResult: element.result + 1,
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
            <img src={logo} height={80} alt="Dice logo" className="GameLogo"/>
            <Balance value={this.state.amount} />
            <BetTimes value={this.state.betTimes} />
            <div style={{display:'grid'}}>
              <SelectDice selected={this.state.selected} onChange=
                {
                  (selectResult) => {
                    this.setState({...this.state, ...selectResult});
              }}/>
            </div>
            
            <Bet value={this.bet} disableBet={this.state.disableBet} callApi={this.state.callApi} onBet={this.handleOnBet} onChange={(value) => {
              this.bet = value;
            }}/>
          </div>
          <div className="div32">
            <div>
              < Odds odds={odds[this.state.selectedCount]} />
            </div>
            <div>
              <Chance value={(100 * this.state.selectedCount / 6).toFixed(2)} />
            </div>
          </div>
          <div className="div33">
              <History value={this.state.history} />
          </div>
        </div>
      
        {/* <div className="div22">
          <Chart value={this.state.amountHistory} />
        </div> */}
      </div>
    )
  }
}