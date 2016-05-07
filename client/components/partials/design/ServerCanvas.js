import React from 'react';
import RouterBlock from './RouterBlock.js';
// React DnD Functionality
// Sets up BlockArea as a place to drop items
import { DropTarget } from 'react-dnd';

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

@DropTarget('router', blockTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
}))
export default class CanvasContainer extends React.Component {
  static propTypes = {
    connectDropTarget: React.PropTypes.func.isRequired,
    isOver: React.PropTypes.bool.isRequired,
    isOverCurrent: React.PropTypes.bool.isRequired,
    children: React.PropTypes.node,
  }

  constructor(props) {
    super(props);
    this.state = {
      hasDropped: false,
      hasDroppedOnChild: false,
    };
  }

  render() {
    const { isOverCurrent, connectDropTarget, routers } = this.props;
    return connectDropTarget(
      <div className="serverCanvas">
        {routers.map(router => (
          <RouterBlock key={router.id} id={router.id} data={router} />
        ))}
      </div>
    );
  }
}
