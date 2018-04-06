import React from 'react';
import * as PostsAPI from '../utils/PostsAPI';
import Post from './Post.js';
import {connect} from "react-redux";
import {loadPost, loadPosts} from "../actions";


class PostDetails extends React.Component {


  componentDidMount(){
    const postId = this.props.postId;
    if (this.props.posts === undefined || this.props.posts[postId] === undefined) {
      PostsAPI
        .getAllPosts()//(postId)//TODO: sanitize
        .then((posts) => this.props.dispatch(loadPosts(posts)))
      //.then(() => this.props.dispatch(loadPosts(postId)))
        //TODO: render 404 if id is not valid

    }

  }

  render() {
    console.log(this.props.posts);
    const {postId, posts} = this.props;
    const post = posts ? posts.find(item => item.id === postId):false;
    // console.log(post);
    //TODO: refactor, change posts index to be postId

    return (
      post && <div className='post-details'>{post.title}</div>
    );
  }
}

function mapStateToProps ({postsReducer}) {
  return {
    posts: postsReducer.posts
  }
}

export default connect(mapStateToProps)(PostDetails);
