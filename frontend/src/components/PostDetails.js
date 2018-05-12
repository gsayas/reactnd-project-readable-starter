import React from 'react';
import Post from './Post.js';
import CommentList from './CommentList.js';
import NotFound from './NotFound.js';
import {connect} from "react-redux";
import {clearErrors, fetchPost} from "../actions/postsActions";

class PostDetails extends React.Component {

  componentDidMount(){
    this.props.dispatch(clearErrors());
    const postId = this.props.postId;
    if (this.props.posts === undefined || !this.props.posts.find(item => item.id === postId)) {
      this.props.dispatch(fetchPost(postId));
    }
  }

  render() {
    const {postId, posts} = this.props;
    const post = posts ? posts.find(item => item.id === postId) : false;

    return (
      !this.props.notFoundError ?
        <div className='post-details-wrapper'>
          {post && <Post post={post} listing={false}/>}
          {post && <CommentList postId={post.id}/>}
        </div>
      :<NotFound />);
  }
}

function mapStateToProps ({postsReducer}) {
  return {
    posts: postsReducer.posts,
    notFoundError: postsReducer.notFoundError
  }
}

export default connect(mapStateToProps)(PostDetails);
