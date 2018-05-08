import React, { Component } from 'react';
import PostList from './PostList.js';
import {Route, withRouter} from 'react-router-dom';
import PostDetails from './PostDetails.js';
import {connect} from "react-redux";
import Modal from 'react-modal';
import '../App.css';
import {loadCategories} from "../actions/postsActions.js";
import {getCategories} from "../utils/PostsAPI";
import CategoryList from "./CategoryList";
import { Jumbotron, Grid } from 'react-bootstrap';

class App extends Component {

  componentDidMount(){
    getCategories()
      .then((categories) => this.props.dispatch(loadCategories(categories)))
  }

  render() {
    return (
      <div className="App">
       <CategoryList categories={this.props.categories}/>
       <Jumbotron>
         <Grid>
           <Route exact path='/' render={() => (
             <PostList />
           )}/>
           <Route exact path='/:category' render={(props) => (
             <PostList
               category={props.match.params.category}
             />
           )}/>
           <Route exact path='/:category/:id' render={(props) => (
             <PostDetails
               postId={props.match.params.id}
             />
           )}/>
         </Grid>
       </Jumbotron>
      </div>
    );
  }
}
Modal.setAppElement('#root');

function mapStateToProps ({postsReducer}) {
  return {
    categories: postsReducer.categories
  };
}

export default withRouter(connect(mapStateToProps)(App));
