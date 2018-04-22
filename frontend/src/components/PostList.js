import React from 'react';
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom'
import Post from './Post.js';
import {fetchPosts, loadCategories, toggleOrder} from "../actions";
import sortBy from 'sort-by';
import CreatePost from './CreatePost.js';
import {getCategories} from "../utils/PostsAPI";

class PostList extends React.Component {

  componentDidMount(){
    this.props.dispatch(fetchPosts());
  }

  handleOrdering = (field) => {
    this.props.dispatch(toggleOrder({orderBy: field}));
  };

  render() {
    const {posts, orderBy} = this.props;

    posts.sort(sortBy(orderBy));

    return (
      <div className="post-list-wrapper">
        <span className='order-block'>Sort by:&nbsp;
          <a href='javascript:void(0)' onClick={() => this.handleOrdering('voteScore')}>score</a>|
          <a href='javascript:void(0)' onClick={() => this.handleOrdering('timestamp')}>date</a>
        </span>
        <CreatePost/>
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
  return postsReducer
}

export default connect(mapStateToProps)(PostList);