import React from 'react';
import Categories from './Categories';
import Blocks from './Blocks';

// Import Redux functions & related actions
import { changeCategory } from './../../../actions/ui.js';
import { connect } from 'react-redux';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }
  // Methods for opening & closing sidebar
  // Redux wasn't used here since it's irrelevant to the global state
  getSidebarWidth() {
    return this.state.open ? '200px' : '25px';
  }

  displayContent() {
    return this.state.open ? 'block' : 'none';
  }

  showCarrots() {
    return this.state.open ? 'fa fa-caret-left' : 'fa fa-caret-right';
  }

  togglePanel() {
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    let sidebarWidth = { width: this.getSidebarWidth() };
    let displayContent = { display: this.displayContent() };
    let carrots = this.showCarrots();
    return (
      <div className="sidebar" style={sidebarWidth}>
        <div className="sidebar-top">
        <a onClick={this.togglePanel.bind(this)} className="toggleLink"><i className={carrots} aria-hidden="true"></i>
        <i className={carrots} aria-hidden="true"></i></a>
        </div>
        <div className="sidebar-content" style={displayContent}>
          <Categories changeCategory={this.props.changeCategory} currentCategory={this.props.currentCategory} />
          <hr></hr>

          <Blocks currentCategory={this.props.currentCategory} />
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  currentCategory: React.PropTypes.string,
  changeCategory: React.PropTypes.func,
};

// Helper functions to add Redux store methods & state attributes to component
function mapStateToProps(state) {
  return {
    currentCategory: state.ui.currentCategory,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeCategory: (category) => {
      dispatch(changeCategory(category));
    },
  };
}
// Use Redux's connect() method to map to the class
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
