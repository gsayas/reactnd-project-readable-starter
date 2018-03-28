import React from 'react';
import PropTypes from "prop-types";
import PostList from "./PostList";


class Post extends React.Component {
  static propTypes = {
    listing: PropTypes.bool,
  }

  render() {
    const {listing, post} = this.props;

    return (
      <div className="post">
        {listing ?
          "listing item"
          :
          "post details"
        }
        <div className="votes-wrapper">
          <span className="vote-count">Votes: {post.voteScore}</span>
          <button className='up-vote'>
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
export default Post;