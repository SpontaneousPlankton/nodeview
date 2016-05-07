import React from 'react';

export default class CategoryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const activeClass = this.props.currentCategory === this.props.data.actionName ? 'btn-active' : null;
    return (
      <a
        onClick={() => this.props.event(this.props.data.actionName)}
        className={`${this.props.data.classes} ${activeClass}`}
      >
      {this.props.data.name}
      </a>
    );
  }
}

CategoryItem.propTypes = {
  data: React.PropTypes.object,
};
