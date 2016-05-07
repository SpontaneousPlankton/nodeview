import React from 'react';
import BlockItem from './BlockItem.js';
import BlockData from './../../../data/blocks.js';

export default class Blocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // Sets "this.shownBlocks" to the relevant array from the loaded BlockData
    // This allows use to load up the currently active Category's blocks
    switch (this.props.currentCategory) {
      case 'SERVER':
        this.shownBlocks = BlockData.server;
        break;
      case 'ROUTERS':
        this.shownBlocks = BlockData.routers;
        break;
      default:
        this.shownBlocks = BlockData.server;
        break;
    }
    return (
      <div className="blocks">
      {this.shownBlocks.map(item =>
        <BlockItem key={item.key} type={item.type} data={item} />
      )}
      </div>
    );
  }
}

Blocks.propTypes = {
  currentCategory: React.PropTypes.string,
};
