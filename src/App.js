import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { setupWorker, rest } from 'msw'

const handlers = [
  rest.get('http://www.guthib.com', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({ username: 'admin' }),
    )
  }),
]

const worker = setupWorker(...handlers)

function App() {
  worker.start()

  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch('http://www.guthib.com').then(res => res.json()).then(setUser)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React

        </a>
        {/* This will go through the MSW worker */}
        {/* {user && <div>{user.username}</div>} */}

        {/* This will not go through the MSW worker and call the real website */}
        <iframe src="http://www.guthib.com" title="test"></iframe>
      </header>
    </div>
  );
}

export default App;
