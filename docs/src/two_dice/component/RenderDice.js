import React, { Component } from 'react';

const DefaultStyle = {
  width: '50',
  height: '50',
  textColor: 'white',
  textSelectedColor: 'orange',
}

export default class RenderDice extends Component {

  constructor(props) {
    super(props)
    this.style = props.style? props.style: DefaultStyle
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  componentDidMount() {
    this.updateCanvas();
  }

  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d')
    const fontSize = 36;
    // ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
    ctx.clearRect((this.refs.canvas.width - fontSize) / 2, (this.refs.canvas.height - fontSize) / 2, (this.refs.canvas.width + fontSize) / 2 + 24, (this.refs.canvas.height + fontSize) / 2);
    ctx.fillStyle = this.props.selected? this.style.textSelectedColor : this.style.textColor;
    ctx.font = fontSize + 'px serif';
    ctx.fillText(this.props.value, this.refs.canvas.width / 2 - fontSize * (parseInt(this.props.value / 10) + 1) / 5, this.refs.canvas.height / 2 + fontSize / 3 );
  }

  handleClick = () => {
    this.props.onClick(this.props.value);
  }

  render() {
    return (
      <canvas ref="canvas" width={this.style.width} height={this.style.height} onClick={this.handleClick}/>
    )
  }
}