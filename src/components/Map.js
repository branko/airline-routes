import React, { Component } from 'react';

class Map extends Component {
  render() {
    return (
      <svg className="map" viewBox="-180 -90 360 180">
        <g transform="scale(1 -1)">
          <image
            xlinkHref="equirectangular_world.jpg"
            href="equirectangular_world.jpg"
            x="-180"
            y="-90"
            height="100%"
            width="100%"
            transform="scale(1 -1)"
          />
          {/* for each route */}
            {this.props.coordinates}
          {/* end route */}
        </g>
      </svg>
    )
  }
}

export default Map;