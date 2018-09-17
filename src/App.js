import React, { Component } from 'react';
import Translation from './Components/Translation';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
          <span className='header'>Translate</span>
          <Translation />
      </div>
    );
  }
}

export default App;
