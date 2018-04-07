import React from 'react';
import {connect} from "react-redux";
import Post from './Post.js';
import {fetchPosts} from "../actions";
import sortBy from 'sort-by';

class PostList extends React.Component {

  state = {orderBy: 'voteScore'};

  componentDidMount(){
    this.props.dispatch(fetchPosts());
  }

  handleOrdering = (field) => {
    const newOrder = this.state.orderBy === field ? '-' + field : field;
    this.setState({orderBy: newOrder});
  };

  render() {
    const {posts} = this.props;
    const {orderBy} = this.state;
    //  console.log('rendering postList');
    // console.log(posts);

    posts.sort(sortBy(orderBy));

    return (
      <div className="post-list-wrapper">
        <span className='order-block'>Order by:&nbsp;
          <a href='#' onClick={() => this.handleOrdering('voteScore')}>votes</a>|
          <a href='#' onClick={() => this.handleOrdering('timestamp')}>date</a>
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
  return {
    posts: postsReducer.posts
  }
}

export default connect(mapStateToProps)(PostList);