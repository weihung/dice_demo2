import React from 'react';

export default class Odds extends React.Component {
  render() {
    return (
      <div className="Odds">
        <div>
          赔率
        </div>
        <div style={{marginTop:"20px"}}>
          {this.props.odds}x
        </div>
      </div>
    )
  }
}