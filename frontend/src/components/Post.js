import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import {castVoteOnPost} from "../actions";


class Post extends React.Component {
  static propTypes = {
    listing: PropTypes.bool,
  }

  render() {
    const {listing, post} = this.props;
    console.log(this.props);

    return (
      <div className="post">
        {listing
          ? "listing item"
          : "post details"
        }
        <div className="votes-wrapper">
          <span className="vote-count">Votes: {post.voteScore}</span>
          <button onClick={() => this.props.dispatch(castVoteOnPost({post, vote: true}))} className='up-vote'>
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