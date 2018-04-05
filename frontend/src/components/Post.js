import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import {asyncCastVoteOnPost} from "../actions";


class Post extends React.Component {
  static propTypes = {
    listing: PropTypes.bool,
  }

  handleVote = ({postId, vote}) => {
    this.props.dispatch(asyncCastVoteOnPost({postId, vote}));
  };

  render() {
    const {listing, post} = this.props;

    console.log('rendering post');

    return (
      <div className="post">
        <h3>{post.title}</h3>
        <div className="author">{post.author}</div>
        <div className="post-body">{post.body}</div>
        <div className="votes-wrapper">
          <span className="vote-count">Votes: {post.voteScore}</span>
          <button onClick={() => this.handleVote({postId: post.id, vote: true})} className='up-vote'>
            +
          </button>
          <button onClick={() => this.handleVote({postId: post.id, vote: false})} className='down-vote'>
            -
          </button>
        </div>
      </div>
    )
  }
}
export default connect()(Post);