import React from 'react';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>Hello
        <button>Login with Github</button>
        <img src="./../Octocat.jpg" />
        <a href="/auth/github"><img src="./../GitHubLG.png" />
        </a>
      </div>
    );
  }
}
