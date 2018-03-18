import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as PostsAPI from './utils/PostsAPI';

class App extends Component {

  state = {
    posts: [],
  }

  //Load all the books in my 'library' (server) and put them in my state
  componentDidMount(){
    PostsAPI.getAllPosts().then((posts) => {
      this.setState({posts: posts})
    });
  }

  render() {
    const {posts} = this.state;

    return (
      <div className="App">
        {posts.map((post) => (
          <div key={post.id}>
            {post.title}
          </div>
        ))}
      </div>
    );
  }
}

export default App;
