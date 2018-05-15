import React from 'react';
import Post from './Post.js';
import CommentList from './CommentList.js';
import {connect} from "react-redux";
import {fetchPost} from "../actions/postsActions";

class PostDetails extends React.Component {

  componentDidMount(){
    const postId = this.props.postId;
    if (this.props.posts === undefined || !this.props.posts.find(item => item.id === postId)) {
      this.props.dispatch(fetchPost(postId));
    }
  }

  render() {
    const {postId, posts} = this.props;
    const post = posts ? posts.find(item => item.id === postId) : false;

    return (
      <div className='post-details-wrapper'>
        {post && <Post post={post} listing={false}/>}
        {post && <CommentList postId={post.id}/>}
      </div>
    );
  }
}

function mapStateToProps ({postsReducer}) {
  return {
    posts: postsReducer.posts,
    messages: postsReducer.messages
  }
}

export default connect(mapStateToProps)(PostDetails);
