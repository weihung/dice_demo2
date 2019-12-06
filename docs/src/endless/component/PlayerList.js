import React from 'react'

export default class PlayerList extends React.Component{

  showList() {
    let result = [];
    for (var i = 0; i < this.props.value.length; i++) {
      const element = this.props.value[i]
      var quantity = element.quantity.split(' ')[0]
      var win = element.number * parseFloat(quantity) / 100
      result.push(<tr key={"endless" + i} className={"History" + i % 2}>
          <td align={'center'}>{element.player}</td>
          <td>{quantity}</td>
          <td>
          {this.props.result * 100 >= element.number && <font color="#ff0000">{element.number / 100}</font>}
          {this.props.result * 100 < element.number && <>{element.number / 100}</>}
          </td>
          <td align={'center'}>{win.toFixed(4)}</td>
          </tr>)
    }
    return result;
  }

  render() {
    return(
      <div className="PlayList" style={{display: 'grid'}}>
        <div style={{margin:'auto', fontSize:'30px'}}>当轮投注</div>
        <table className={"TableHistory"}>
          <tbody>
            <tr><th style={{width:'110px'}}>玩家</th><th style={{width:'80px'}}>投注</th><th style={{width:'50px'}}>回报率</th><th style={{width:'110px'}}>收益</th></tr>
            {
              this.showList()
            }
          </tbody>
        </table>
      </div>
    )
  }
}