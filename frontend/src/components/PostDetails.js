import React from 'react';
import * as PostsAPI from '../utils/PostsAPI';
import Post from './Post.js';
import CommentList from './CommentList.js';
import {connect} from "react-redux";
import {loadPost} from "../actions";


class PostDetails extends React.Component {

  state = {
    postFound: true
  }

  componentDidMount(){
    const postId = this.props.postId;
    if (this.props.posts === undefined || !this.props.posts.find(item => item.id === postId)) {
      PostsAPI
        .getPost(postId)
        .then((post) => this.props.dispatch(loadPost(post)))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.posts.length !== 0) {
      if (nextProps.posts.find((post) => post.id === nextProps.postId) === undefined) {
        this.setState({ postFound: false })
      }
    }
  }

  render() {
    const {postId, posts} = this.props;
    const post = posts ? posts.find(item => item.id === postId) : false;

    if( this.state.postFound === true ) {
      return (
        <div className='post-details-wrapper'>
          {post && <Post post={post}/>}
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
