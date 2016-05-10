import React from 'react';
import RouterBlock from './RouterBlock.js';
// React DnD Functionality
// Sets up BlockArea as a place to drop items
import { DropTarget as dropTarget } from 'react-dnd';

// Settings for Target areafor React DnD
const blockTarget = {
  drop(props, monitor, component) {
    const hasDroppedOnChild = monitor.didDrop();
    if (hasDroppedOnChild) {
      return;
    }

    component.setState({
      hasDropped: true,
      hasDroppedOnChild,
    });
  },
};

@dropTarget('router', blockTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
}))
export default class CanvasContainer extends React.Component {
  static propTypes = {
    connectDropTarget: React.PropTypes.func.isRequired,
    routers: React.PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.state = {
      hasDropped: false,
      hasDroppedOnChild: false,
    };
  }

  render() {
    const { connectDropTarget, routers } = this.props;
    return connectDropTarget(
      <div className="serverCanvas">
        {routers.map((router, index) => (
          <RouterBlock key={router.id} id={router.id} data={router} routerIndex={index} />
        ))}
      </div>
    );
  }
}
