import React, { Component } from 'react';
import PostList from './PostList.js';
import '../App.css';
import * as PostsAPI from '../utils/PostsAPI';

class App extends Component {

  state = {
    posts: [],
  }

  componentDidMount(){
    PostsAPI.getAllPosts().then((posts) => {
      this.setState({posts: posts})
    });
  }

  render() {
    const {posts} = this.state;

    return (
      <div className="App">
        <PostList posts={posts}/>
      </div>
    );
  }
}

export default App;
