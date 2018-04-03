import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import {castVoteOnPost} from "../actions";


class Post extends React.Component {
  static propTypes = {
    listing: PropTypes.bool,
  }

  handleVote = ({postIndex, vote}) => {
    this.props.dispatch(castVoteOnPost({postIndex, vote}));
  };

  render() {
    const {listing, post, postIndex} = this.props;
    console.log('rendering post');

    return (
      <div className="post">
        {listing
          ? "listing item"
          : "post details"
        }
        <div className="votes-wrapper">
          <span className="vote-count">Votes: {post.voteScore}</span>
          <button onClick={() => this.handleVote({postIndex, vote: true})} className='up-vote'>
            +
          </button>
          <button className='down-vote'>
            -
          </button>
        </div>
      </div>
    )
  }

}
export default connect()(Post);