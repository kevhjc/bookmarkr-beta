import React, { Component } from 'react';
import { render } from 'react-dom';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <h1>Tic Tac Toe</h1>
        {/* <Board /> */}
      </div>
    );
  }
}

render(<App />, document.querySelector('#root'));

export default App;
