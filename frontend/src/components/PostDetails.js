import React from 'react';
import * as PostsAPI from '../utils/PostsAPI';
import Post from './Post.js';
import CommentList from './CommentList.js';
import {connect} from "react-redux";
import {fetchPost} from "../actions/postsActions";


class PostDetails extends React.Component {

  state = {
    postFound: true
  }

  componentDidMount(){
    const postId = this.props.postId;
    if (this.props.posts === undefined || !this.props.posts.find(item => item.id === postId)) {
      this.props.dispatch(fetchPost(postId));
    }
  }

  isPostFound(posts, postId) {
    console.log(posts);
    return posts.find((post) => post.id === postId) !== undefined
  }

  componentWillUnmount(){
    console.log('unmount');
  }

  render() {
    const {postId, posts} = this.props;
    const post = posts ? posts.find(item => item.id === postId) : false;

    if( this.isPostFound(posts, postId) ) {
      return (
        <div className='post-details-wrapper'>
          {post && <Post post={post} listing={false}/>}
          {post && <CommentList postId={post.id}/>}
        </div>
      );
    }else{
      return (<div className='not-found'>Post not found</div>);
    }
  }
}

function mapStateToProps ({postsReducer}) {
  return {
    posts: postsReducer.posts
  }
}

export default connect(mapStateToProps)(PostDetails);
