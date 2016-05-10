import React from 'react';

// React DnD Functionality
// Sets up BlockArea as a place to drop items
import { DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd';

// Settings for Target areafor React DnD

const endpointSource = {
  beginDrag({ data, routerIndex, endpointIndex }) {
    return {
      id: data.id,
      routerIndex,
      endpointIndex,
    };
  },
};

const endpointTarget = {
  hover(targetProps, monitor) {
    const targetId = targetProps.data.id;
    const targetRouterIndex = targetProps.routerIndex;
    const targetEndpointIndex = targetProps.endpointIndex;

    const sourceProps = monitor.getItem();
    const sourceRouterIndex = sourceProps.routerIndex;
    const sourceEndpointIndex = sourceProps.endpointIndex;
    const sourceId = sourceProps.id;

    if (sourceId !== targetId) {
      targetProps.onMove({
        sourceId,
        targetId,
        sourceEndpointIndex,
        targetEndpointIndex,
        sourceRouterIndex,
        targetRouterIndex,
      });
    }
  },
};

@dragSource('endpoint', endpointSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
@dropTarget('endpoint', endpointTarget, (connect) => ({
  connectDropTarget: connect.dropTarget(),
}))
export default class Endpoint extends React.Component {
  static propTypes = {
    connectDropTarget: React.PropTypes.func.isRequired,
    connectDragSource: React.PropTypes.func.isRequired,
    data: React.PropTypes.object,
    routerIndex: React.PropTypes.number,
    endpointIndex: React.PropTypes.number,
    isDragging: React.PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { connectDragSource, connectDropTarget, isDragging } = this.props;
    return connectDragSource(connectDropTarget(
      <div className="block block-endpoint" style={{ opacity: isDragging ? 0 : 1 }}>
        <div className="block-settings">
        <i className="fa fa-info-circle" aria-hidden="true"></i>
        <i className="fa fa-sliders" aria-hidden="true"></i>
        </div>
        <div className="block-info">
        <span className="block-icon"><i className="fa fa-code-fork" aria-hidden="true"></i></span>
        <span className="block-text">{this.props.data.endpoint}</span>
        </div>
      </div>
    ));
  }
}
