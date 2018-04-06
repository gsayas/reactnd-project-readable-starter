import React from 'react';
import {connect} from "react-redux";
import Post from './Post.js';
import {fetchPosts} from "../actions";

class PostList extends React.Component {

  componentDidMount(){
    this.props.dispatch(fetchPosts());
  }

  render() {
    const {posts} = this.props;
     console.log('rendering postList');
    // console.log(posts);

    return (
      <div className="post-list-wrapper">
        <ul className="post-list">
          {posts && posts.map((post) => (
            <li key={post.id}>
              <Post
                listing={true}
                post={post}
              />
            </li>
          ))}
        </ul>
      </div>
    )

  }
}

function mapStateToProps ({postsReducer}) {
  return {
    posts: postsReducer.posts
  }
}

export default connect(mapStateToProps)(PostList);