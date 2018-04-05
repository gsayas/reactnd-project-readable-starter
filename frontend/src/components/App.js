import React, { Component } from 'react';
import PostList from './PostList.js';
import '../App.css';
//TODO: optimize imports

class App extends Component {

  render() {
    console.log('rendering app');

    return (
      <div className="App">
       <PostList />
      </div>
    );
  }
}

export default App;
