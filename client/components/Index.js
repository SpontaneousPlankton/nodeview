import React from 'react';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="fullscreen">
        <div className="jumbotron">
          <img src="http://images.clipartpanda.com/butler-clipart-batman001.gif" className="butler" alt="PLACEHOLDER" />
          <a href="/auth/github"><img src="./../GitHubLG.png" className="github" /></a>
        </div>
        <div className="about">
          <h1>The standard Lorem Ipsum</h1>
          <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h4>
          <i className="fa fa-lock" aria-hidden="true">Secure</i>
          <i className="fa fa-magic" aria-hidden="true">Magical</i>
        </div>
      </div>
    );
  }
}
