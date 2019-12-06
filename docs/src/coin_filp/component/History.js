import React from 'react';
import king_selected from './images/king_selected.png'
import queen_selected from './images/pound_selected.png'

const coins = [king_selected, queen_selected]
export default class ChanHistoryce extends React.Component {
  showHistory() {
    let result = [];
    for (var i = 1; i <= 15 ; i++){
      if (this.props.value && i <= this.props.value.length) {
        const element = this.props.value[this.props.value.length - i];
        result.push(<tr key={"coin" + i} className={"History" + i % 2}>
          <td align={'center'}><img src={coins[element.number]} width={20} height={20} alt="select"/></td>
          <td>${element.amount.toFixed(4)}</td>
          <td align={'center'}><img src={coins[element.RandomResult]} width={20} height={20} alt="result"/></td>
          {element.winamount > 0 && <td><font color="#ff0000">${element.winamount.toFixed(4)}</font></td>}
          {element.winamount === 0 && <td>${element.winamount.toFixed(4)}</td>}
          </tr>)
      }  else {
        result.push(<tr key={"dietherollce" + i} className={"History" + i % 2}><td /><td /><td /><td /></tr>)
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
            <tr><th style={{width:'50px'}}>号码</th><th style={{width:'80px'}}>下注金額</th><th style={{width:'50px'}}>奖号</th><th style={{width:'110px'}}>奖金</th></tr>
            {this.showHistory()}
          </tbody>
        </table>
      </div>
    )
  }
}