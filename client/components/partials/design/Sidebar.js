import React from 'react';
import Form from './Form.js';
import { connect } from 'react-redux';

@connect(state => ({
  routers: state.routers,
}))
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
    this.togglePanel = this.togglePanel.bind(this);
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
        <a onClick={this.togglePanel} className="toggleLink">
          <i className={carrots} aria-hidden="true"></i>
          <i className={carrots} aria-hidden="true"></i>
        </a>
        </div>
        <div className="sidebar-content" style={displayContent}>
          <Form routers={this.props.routers} />
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  routers: React.PropTypes.array,
};

export default Sidebar;

