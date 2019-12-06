import React, { Component } from 'react';
import RenderDice from './RenderDice';

export default class SelectDice extends Component {

  handleClick = (value) => {
    var selected = this.props.value ^ (1 << (value - 2));
    this.props.onChange(selected);
  }

  render() {
    var result = [];
    for (var i = 0; i < 11; i += 4){
      result.push(
        <tr key={"dice" + i}>
          <td><RenderDice value={i + 2} selected={this.props.value & (1 << (i))} onClick={this.handleClick} /></td>
          <td><RenderDice value={i + 3} selected={this.props.value & (1 << (i + 1))} onClick={this.handleClick}/></td>
          <td><RenderDice value={i + 4} selected={this.props.value & (1 << (i + 2))} onClick={this.handleClick}/></td>
          <td>{(i + 5 < 12) && <RenderDice value={i + 5} selected={this.props.value & (1 << (i + 3))} onClick={this.handleClick}/>}</td>
        </tr>
      )
    }
    return (
      <table className="DiceTable" style={{margin:"auto"}}>
        <tbody>
        {result}
        </tbody>
      </table>
    );
  }
}