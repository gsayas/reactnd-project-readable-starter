import React from 'react';
import PropTypes from "prop-types";
import PostList from "./PostList";


class Post extends React.Component {
  static propTypes = {
    listing: PropTypes.bool,
  }

  render() {
    const {listing} = this.props;

    return (
      <div className="post">
        {listing ?
          "listing item"
          :
          "post details"
        }
      </div>
    )
  }

}
export default Post;