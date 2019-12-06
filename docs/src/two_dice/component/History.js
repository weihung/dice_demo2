import React from 'react';
import '../../css/History.css'

export default class ChanHistoryce extends React.Component {

  showDice(nums) {
    let result = ''
    for (var i = 0; i < 11; i++) { 
      if (nums[i]) result += ` ${i + 2}`
    }
    return result
  }

  showHistory() {
    let result = [];
    for (var i = 1; i <= 15 ; i++){
      if (i <= this.props.value.length) {
        const element = this.props.value[this.props.value.length - i];
        result.push(
          <tr key={"twodice" + i} className={"History" + i % 2}>
          <td align={'right'}>{this.showDice(element.number)}</td>
          <td>${element.amount.toFixed(4)}</td>
          <td>{element.RandomResult}</td>
          {element.winamount > 0 && <td><font color="#ff0000">${element.winamount.toFixed(4)}</font></td>}
          {element.winamount === 0 && <td>${element.winamount.toFixed(4)}</td>}
          </tr>)
      } else {
        result.push(<tr key={"twodice" + i} className={"History" + i % 2}><td /><td /><td /><td /></tr>)
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
            <tr><th style={{width:'140px'}}>号码</th><th style={{width:'80px'}}>下注金額</th><th style={{width:'50px'}}>奖号</th><th style={{width:'110px'}}>奖金</th></tr>
            {
              this.showHistory()
            }
          </tbody>
        </table>
      </div>
    )
  }
}