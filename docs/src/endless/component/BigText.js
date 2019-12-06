import React from 'react';
import './BigText.css';

export default class BigText extends React.Component{
  render() {
    return(
      <div className="BigText">
        <div className="BigText-Text">
          {this.props.value}
        </div>
      </div>
    )
  }
}