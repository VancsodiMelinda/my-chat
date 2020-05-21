/*
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/

import React, {Component} from 'react';
import {Login} from "./Login";
import {Main} from "./Main";
import {proxy} from "./Proxy"

export default class App extends Component
{
  state = { showLogin: true };

  componentDidMount()
  {
    proxy.addEventListener( "login", () => this.setState( { showLogin: false } ) );
  }

  render()
  {
    return (
      <div className="app">
        { this.state.showLogin ? <Login /> : <Main /> }
      </div>
    );
  }
}

// { this.state.showLogin ? <Login /> : <Main /> }