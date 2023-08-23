import React, { useState } from 'react';
import './App.css';

const LOADING_STATE = {
  IDLE: 'idle',
  LOADING: 'loading',
};

const MESSAGE_TYPE = {
  SUCCESS: 'success',
  FAILURE: 'failure',
};

function App() {
  const [repos, setRepos] = useState([]);
  const [username, setUsername] = useState('');
  const [dataState, setDataState] = useState(LOADING_STATE.IDLE);
  const [message, setMessage] = useState({ type: null, text: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();

    setDataState(LOADING_STATE.LOADING);

    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      const reposData = await response.json();

      if (response.ok && reposData.length > 0) {
        onSuccess(reposData);
      } else if (reposData.length === 0) {
        showMessage(MESSAGE_TYPE.FAILURE, 'No repos found.');
      } else if (response.status === 404) {
        showMessage(MESSAGE_TYPE.FAILURE, 'Github user not found.');
      } else {
        throw new Error('Something went wrong.');
      }
    } catch (error) {
      showMessage(MESSAGE_TYPE.FAILURE, 'Something went wrong.');
    } finally {
      setDataState(LOADING_STATE.IDLE);
    }
  };

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: null, text: '' }), 3000);
  };

  const onSuccess = (reposData) => {
    const searchResults = reposData.map((repo) => ({
      id: repo.id,
      name: repo.name || '-',
      description: repo.description || '-',
      html_url: repo.html_url || '#',
    }));
    showMessage(MESSAGE_TYPE.SUCCESS, 'Success!');
    setRepos(searchResults);
  };

  return (
    <div className="app">
      <header>
        <h1>Get Github Repos</h1>
      </header>

      <main>
        <section className="message-area">
          {message.type && (
            <p className={`message-${message.type}`}>
              <strong>{message.text}</strong>
            </p>
          )}
        </section>

        <form className="input-area" onSubmit={handleSubmit}>
          <div className="field-username">
            <label htmlFor="username">Github Username</label>
            <input id="username" onChange={handleChange} value={username} />
          </div>

          <button className="submit" type="submit">
            Go
          </button>
        </form>

        <section className="output-area">
          {dataState === LOADING_STATE.LOADING && <div className="circle"></div>}
          {dataState === LOADING_STATE.IDLE && !repos?.length && (
            <p className="output-status-text">No repos</p>
          )}
          {dataState === LOADING_STATE.IDLE && repos.length > 0 && (
            <div className="repo-list-container">
              <p className="repo-amount">Found {repos.length} Repos</p>
              <ul>
                {repos.map(({ id, name, description, html_url }) => (
                  <li className="repo-row" key={id}>
                    <p>
                      <a href={html_url} rel="noopener noreferrer" target="_blank">
                        {name}
                      </a>
                    </p>
                    <p className="repo-description">{description || '–'}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;