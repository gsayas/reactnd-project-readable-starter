import React from 'react';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {asyncCastVoteOnPost, removePost} from "../actions";
import EditPost from './EditPost.js';
import {deletePost} from "../utils/PostsAPI";


class Post extends React.Component {
  static propTypes = {
    listing: PropTypes.bool,
  }

  handleVote = (postId, vote) => {
    this.props.dispatch(asyncCastVoteOnPost({postId: postId, vote: vote}));
  };

  handleDelete = (postId) => {
    if(window.confirm('Are you sure to delete this post?')){
      deletePost(postId)
        .then(() => {
          this.props.dispatch(removePost({postId}));
        })
    }
  };

  render() {
    const {listing, post} = this.props;
    // console.log('rendering post');

    return (
      <div className="post">
        <div className='links'>
          <EditPost post={post}/>|
          <a href='javascript:void(0)' onClick={() => this.handleDelete(post.id)}>delete</a>
        </div>
        <h3><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></h3>
        <div className="author">{post.author}</div>
        <div className="post-body">{post.body}</div>
        <div className="post-commentsCount"># of comments: {post.commentCount}</div>
        <div className="votes-wrapper">
          <span className="vote-count">Votes: {post.voteScore}</span>
          <button onClick={() => this.handleVote(post.id, true)} className='up-vote'>
            +
          </button>
          <button onClick={() => this.handleVote(post.id, false)} className='down-vote'>
            -
          </button>
        </div>
        <div className="post-timestamp">{(new Date(post.timestamp)).toDateString()}</div>
      </div>
    )
  }
}
export default connect()(Post);