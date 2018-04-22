import React, { Component } from 'react';
import PostList from './PostList.js';
import {Route, withRouter} from 'react-router-dom';
import PostDetails from './PostDetails.js';
import {connect} from "react-redux";
import Modal from 'react-modal';
import '../App.css';
import {fetchPosts, loadCategories} from "../actions";
import {getCategories} from "../utils/PostsAPI";
//TODO: optimize imports

class App extends Component {

  componentDidMount(){
    getCategories()
      .then((categories) => this.props.dispatch(loadCategories(categories)))
  }

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
Modal.setAppElement('#root');

export default withRouter(connect()(App));
