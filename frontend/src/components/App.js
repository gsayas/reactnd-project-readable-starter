import React, { Component } from 'react';
import PostList from './PostList.js';
import {Route} from 'react-router-dom';
import PostDetails from './PostDetails.js';
import '../App.css';
//TODO: optimize imports

class App extends Component {

  render() {
    return (
      <div className="App">
       <Route exact path='/' render={() => (
          <PostList />
       )}/>
       <Route path='/post/:id' render={(props) => (
         <PostDetails
           postId={props.match.params.id}
         />
       )}/>
      </div>
    );
  }
}

export default App;
