import React from 'react';

// Implement React DnD to enable this to be dragged
import { DragSource } from 'react-dnd';

class BlockItem extends React.Component {
  static propTypes = {
    connectDragSource: React.PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { connectDragSource } = this.props;

    return connectDragSource(
      <div className="block block-lg">
        <div className="block-settings">
        <i className="fa fa-info-circle" aria-hidden="true"></i><i className="fa fa-sliders" aria-hidden="true"></i>
        </div>
        <div className="block-info">
        <span className="block-icon"><i className={this.props.data.icon} aria-hidden="true"></i></span>
        <span className="block-text">{this.props.data.name}</span>
        </div>
      </div>
    );
  }
}

BlockItem.propTypes = {
  data: React.PropTypes.object,
};

const boxSource = {
  beginDrag() {
    return {};
  },
};

export default DragSource(props => props.type, boxSource, (connect) => ({
  connectDragSource: connect.dragSource(),
}))(BlockItem);
