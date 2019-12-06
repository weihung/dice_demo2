import React, { Component } from 'react'
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'
// import ValueViewer from 'docs/src/pages/ValueViewer' // for examples only - displays the table above slider
import { SliderRail, Handle, Track, Tick  } from './SliderStyle' // example render components - source below

const sliderStyle = {
  position: 'relative',
  width: '100%',
  touchAction: 'none',
}

const domain = [0, 100]
const defaultValues = [50]

class Etheroll extends Component {
  state = {
    values: defaultValues.slice(),
  }

  onUpdate = values => {
    if (values < 1 )
      values = [1];

    if (values > 97) 
      values = [97];
    this.props.onChange(this.state.values.slice()[0])
    this.setState({ values })
  }

  // onChange = values => {
  //   // if (values < 1 || values > 97) return;
  //   this.props.onChange(this.state.values.slice()[0])
  // }

  render() {
    const {
      state: { values },
    } = this

    return (
      <>
      <div style={{ height: 50, width: 300, margin:'auto'}}>
        <Slider
          mode={1}
          step={1}
          domain={domain}
          rootStyle={sliderStyle}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          values={values}
        >
          <Rail>
            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
          <Ticks count={5}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map(tick => (
                  <Tick key={tick.id} tick={tick} count={ticks.length} />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      </div>
      </>

    )
  }
}

export default Etheroll