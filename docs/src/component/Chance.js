import React from 'react';

export default class Chance extends React.Component {
  render() {
    return (
      <div className="Chance">
        <div>
          胜率
        </div>
        <div style={{marginTop:"20px"}}>
          {this.props.value}%
        </div>
      </div>
    )
  }
}