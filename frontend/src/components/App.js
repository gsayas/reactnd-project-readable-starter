import React, { Component } from 'react';
import PostList from './PostList.js';
import '../App.css';

class App extends Component {

  render() {

    return (
      <div className="App">
       <PostList />
      </div>
    );
  }
}

export default App;
