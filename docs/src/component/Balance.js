import React from 'react';

export default class Balance extends React.Component {
  render() {
    return (
      <div className="Balance" style={{display:'grid'}}>
        <div style={{margin:'auto'}}>
          目前馀额
        </div>
        <div style={{margin:'auto'}}>
          {this.props.value}
        </div>
      </div>
    )
  }
}