import React from 'react';

export default class BetTimes extends React.Component {
  render() {
    return (
      <div className="BetTimes" style={{margin:'auto', display:'grid'}}>
        <div style={{margin:'auto'}}>
          下注次数
        </div>
        <div style={{margin:'auto'}}>
          {this.props.value}
        </div>
      </div>
    )
  }
}