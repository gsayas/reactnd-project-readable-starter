import React from 'react';
import * as PostsAPI from '../utils/PostsAPI';
import Post from './Post.js';
import CommentList from './CommentList.js';
import {connect} from "react-redux";
import {loadPost} from "../actions";


class PostDetails extends React.Component {


  componentDidMount(){
    const postId = this.props.postId;
    if (this.props.posts === undefined || !this.props.posts.find(item => item.id === postId)) {
      PostsAPI
        .getPost(postId) //TODO: sanitize
        .then((post) => this.props.dispatch(loadPost(post)))
      //.then(() => this.props.dispatch(loadPosts(postId)))
        //TODO: render 404 if id is not valid
    }
  }

  render() {
    const {postId, posts} = this.props;
    const post = posts ? posts.find(item => item.id === postId) : false;
    //TODO: refactor, change posts index to be postId

    return (
      <div className='post-details-wrapper'>
        {post && <Post listing={false} post={post} />}
        {post && <CommentList postId={post.id} />}
      </div>
    );
  }
}

function mapStateToProps ({postsReducer}) {
  return {
    posts: postsReducer.posts
  }
}

export default connect(mapStateToProps)(PostDetails);
