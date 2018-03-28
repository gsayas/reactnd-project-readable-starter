import React from 'react';
import Post from './Post.js';
import PropTypes from "prop-types";

class PostList extends React.Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
  }

  render() {
    const {posts} = this.props;

    return (
      <div className="post-list-wrapper">
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.id}>
              {post.title}
              <Post
                post={post}
                listing={true}
              />
            </li>
          ))}
        </ul>
      </div>
    )

  }
}
export default PostList;