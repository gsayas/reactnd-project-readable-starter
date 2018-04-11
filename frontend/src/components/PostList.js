import React from 'react';
import {connect} from "react-redux";
import Post from './Post.js';
import {fetchPosts, toggleOrder} from "../actions";
import sortBy from 'sort-by';

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