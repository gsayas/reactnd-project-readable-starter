import React, { Component } from 'react';
import PostList from './PostList.js';
import '../App.css';
import * as PostsAPI from '../utils/PostsAPI';
import {connect} from "react-redux";
import {loadPosts, fetchPosts} from "../actions";

class App extends Component {

  state = {
    posts: [],
  }

  componentDidMount(){
    this.props.dispatch(fetchPosts());
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

export default connect()(App);
