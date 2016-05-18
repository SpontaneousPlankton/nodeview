import React from 'react';
import GithubForm from './GithubForm.js';
import { reduxForm } from 'redux-form';
import { hashHistory } from 'react-router';

// Import storage to reset it
import storage from '../../../storage.js';
import { connect } from 'react-redux';

export const fields = [
  'configName',
  'port',
  'github.repoName',
  'github.privacy',
  'github.description',
];

/* Form validation function */
const validate = values => {
  const errors = {};
  if (!values.configName) {
    errors.configName = 'Required';
  } else if (values.configName.length > 15) {
    errors.configName = 'Must be 15 characters or less';
  }
  if (values.port && !/^\d{1,4}\s*$/.test(values.port)) {
    errors.port = 'Port must be an integer between 0 and 9999';
  } else if (values.port && values.port.length > 5) {
    errors.port = 'Must be 5 characters or less';
  }
  const githubErrors = {};
  if (values.github.description && values.github.description.length > 200) {
    githubErrors.description = 'Description should be 200 characters or fewer';
  }
  if (!values.github.repoName) {
    githubErrors.repoName = 'Required';
  }
  errors.github = githubErrors;
  return errors;
};

@connect(null, dispatch => ({
  resetState: () => {
    dispatch({ type: 'RESET_STATE' });
  },
}))
@reduxForm({
  form: 'config',
  fields,
  validate,
})
export default class Form extends React.Component {
  static propTypes = {
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,
    routers: React.PropTypes.array,
    resetState: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      serverType: null,
    };
  }

  sendData = (formData) => {
    hashHistory.push('/loading');
    const resetState = this.props.resetState;
    const jsonData = {
      data: {
        serverType: formData.serverType,
        Name: formData.configName,
        serverSettings: {
          port: formData.port,
          expressName: formData.expressName,
        },
        routers: this.props.routers,
        github: {
          repoName: formData.github.repoName,
          privacy: formData.github.privacy || false,
          description: formData.github.description,
        },
      },
    };
    console.log(jsonData);

    fetch('/serve', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(jsonData),
      credentials: 'same-origin',
    })
    .then(response => {
      response.json().then(obj => {
        resetState();
        storage.remove('app_state');
        hashHistory.push(`/success/${obj.user}/${obj.repoName}/`);
      });
    })
    .catch(err => console.log('darn:  ', err));
  }

  saveData = (formData) => {
    const resetState = this.props.resetState;
    const jsonData = {
      data: {
        serverType: formData.serverType,
        Name: formData.configName,
        serverSettings: {
          port: formData.port,
          expressName: formData.expressName,
        },
        routers: this.props.routers,
        github: {
          repoName: formData.github.repoName,
          privacy: formData.github.privacy || false,
          description: formData.github.description,
        },
      },
    };
    console.log(jsonData);

    fetch('/config', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(jsonData),
      credentials: 'same-origin',
    })
    .catch(err => console.log('darn:  ', err));
  }

  render() {
    const { fields: { configName, port, github }, handleSubmit, submitting } = this.props;
    return (
      <form className="serverSettings">
        <div>
          <div className="serverLabel">App Name</div>
          <div>
            {configName.touched && configName.error && <div className="error">{configName.error}</div>}
            <input className={(configName.touched && configName.error) ? 'error' : null}
              type="text" name="configName" placeholder="MyApp" required {...configName} autoFocus
            />
          </div>
        </div>
        <div className="express">
          <div className="serverLabel">Port</div>
          <div>
            {port.touched && port.error && <div className="error">{port.error}</div>}
            <input className={(port.touched && port.error) ? 'error' : null}
              type="text" name="port" placeholder="8000" {...port}
            />
            <br />
          </div>
        </div>
        <GithubForm {...github} />
        <button disabled={submitting} onClick={handleSubmit(this.saveData)}
          name="submitConfig" className="btn btn-submit"
        >Save Files
        </button>
       <br />
        <button disabled={submitting} onClick={handleSubmit(this.sendData)}
          name="submitConfig" className="btn btn-submit"
        >Build Server
        </button>
      </form>
    );
  }
}
