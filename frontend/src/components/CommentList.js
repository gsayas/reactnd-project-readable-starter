import React from 'react';
import {connect} from "react-redux";
import {fetchComments} from "../actions";
import Comment from './Comment.js';
import CreateComment from './CreateComment.js';
import sortBy from 'sort-by';

class CommentList extends React.Component {

  componentDidMount(){
    this.props.dispatch(fetchComments(this.props.postId));
  }

  render() {
    const globalComments = this.props.comments;
    const comments = globalComments[this.props.postId];

    comments && comments.sort(sortBy('-voteScore'));//TODO: move to componentWillReceiveProps

    return (
      <div className="comment-list-wrapper">
        <CreateComment postId={this.props.postId}/>
        <ul className="comment-list">
          {comments && comments.map((comment) => (
            <li key={comment.id}>
              <Comment
                comment={comment}
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
function mapStateToProps ({commentsReducer}) {
  return {
    comments: commentsReducer
  }
}

export default connect(mapStateToProps)(CommentList);