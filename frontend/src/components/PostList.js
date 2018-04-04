import React from 'react';
import {connect} from "react-redux";
import * as PostsAPI from '../utils/PostsAPI';
import {castVoteOnPost, fetchPosts, loadPosts} from "../actions";

class PostList extends React.Component {

  componentDidMount(){
    this.props.dispatch(fetchPosts());
  }

  handleVote = ({postId, postIndex, vote}) => {
    PostsAPI
      .vote(postId, vote)
      .then(
        () => this.props.dispatch(castVoteOnPost({postIndex, vote}))
      );
  };

  render() {
    const {posts} = this.props;
    // console.log('rendering postList');
    // console.log(posts);

    return (
      <div className="post-list-wrapper">
        <ul className="post-list">
          {posts && Array.isArray(posts) && posts.map((post,postIndex) => (
            <li key={post.id}>
              {post.title}
              <div className="votes-wrapper">
                <span className="vote-count">Votes: {post.voteScore}</span>
                <button onClick={() => this.handleVote({postId: post.id, postIndex, vote: true})} className='up-vote'>
                  +
                </button>
                <button onClick={() => this.handleVote({postId: post.id, postIndex, vote: false})} className='down-vote'>
                  -
                </button>
              </div>
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