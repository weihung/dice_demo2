import React from 'react';
import dice1 from './images/dice1.png';
import dice2 from './images/dice2.png';
import dice3 from './images/dice3.png';
import dice4 from './images/dice4.png';
import dice5 from './images/dice5.png';
import dice6 from './images/dice6.png';
import '../../css/History.css'

const dices = [dice1, dice2, dice3, dice4, dice5, dice6];
const style = {
  diceImage: {
    width: '20px',
    height: '20px',
  },
  fontSize: '2',
} 

export default class ChanHistoryce extends React.Component {

  showDice(nums) {
    let result = [];
    for (var i = 0; i < 6; i++) { 
      if (nums[i])
        result.push(<img src={dices[i]} style={style.diceImage} alt="dice" key={"dice" + i}/>)
    }
    return result
  }

  showHistory() {
    let result = [];
    for (var i = 1; i <= 15 ; i++){
      if (this.props.value && i <= this.props.value.length) {
        const element = this.props.value[this.props.value.length - i];
        result.push(<tr key={"dice" + i} className={"History" + i % 2}>
          <td align={'right'} className="SmallDice">{this.showDice(element.number)}</td>
          <td>${element.amount.toFixed(4)}</td>
          <td>{element.RandomResult}</td>
          {element.winamount > 0 && <td><font color="#ff0000">${element.winamount.toFixed(4)}</font></td>}
          {element.winamount === 0 && <td>${element.winamount.toFixed(4)}</td>}
        </tr>)
      } else {
        result.push(<tr key={"dice" + i} className={"History" + i % 2}><td /><td /><td /><td /></tr>)
      }
    }; 
    return result;
  }

  render() {
    return (
      <div className="History">
        <div style={{margin:'auto'}}>投注记录</div>
        <table className={"TableHistory"}>
          <tbody>
            <tr><th style={{width:'110px'}}></th><th style={{width:'80px'}}>下注金額</th><th style={{width:'50px'}}>奖号</th><th style={{width:'110px'}}>奖金</th></tr>
            {
              this.showHistory()
            }
          </tbody>
        </table>
      </div>
    )
  }
}