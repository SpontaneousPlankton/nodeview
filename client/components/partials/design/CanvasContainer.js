import React from 'react';
import ServerCanvas from './ServerCanvas.js';

// Redux Actions & Methods
import { createRouter } from './../../../actions/routers.js';
import { connect } from 'react-redux';

// Use Redux's connect() method to map to the class
@connect(state => ({
  routers: state.routers,
}), dispatch => ({
  createRouter: (router) => {
    dispatch(createRouter(router));
  },
}))
export default class CanvasContainer extends React.Component {
  static propTypes = {
    createRouter: React.PropTypes.func.isRequired,
    routers: React.PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { createRouter, routers } = this.props;
    return (
      <div className="blockArea">
        <div className="canvasButtonContainer">
          <button className="btn btn-primary"
            onClick={createRouter.bind(null, {
              name: 'New router',
            })}
          >
          <i className="fa fa-plus" aria-hidden="true"></i> Add Router
          </button>
        </div>

      <ServerCanvas routers={routers} />
      </div>
    );
  }
}
