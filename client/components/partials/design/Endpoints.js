import React from 'react';
import Endpoint from './Endpoint.js';

export default class RouterBlock extends React.Component {
  static propTypes = {
    endpoints: React.PropTypes.array,
    routerId: React.PropTypes.string,
    moveEndpoint: React.PropTypes.func,
    routerIndex: React.PropTypes.number,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { endpoints, routerId, moveEndpoint, routerIndex } = this.props;
    return (
      <div className="endpointsContainer">
        {endpoints.map((endpoint, index) => (
          <Endpoint key={endpoint.id}
            data={endpoint}
            routerId={routerId}
            endpointIndex={index}
            routerIndex={routerIndex}
            onMove={moveEndpoint}
          />
          ))}
      </div>
      );
  }
}
