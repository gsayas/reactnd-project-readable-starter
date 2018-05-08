import React from 'react';
import {connect} from "react-redux";
import {fetchComments} from "../actions/commentsActions.js";
import Comment from './Comment.js';
import CreateComment from './CreateComment.js';
import sortBy from 'sort-by';

class CommentList extends React.Component {

  componentDidMount(){
    this.props.dispatch(fetchComments(this.props.postId));
  }

  componentWillReceiveProps(nextProps) {
    nextProps.comments[nextProps.postId].sort(sortBy('-timestamp'));
  }

  render() {
    const globalComments = this.props.comments;
    const comments = globalComments[this.props.postId];

    return (
      <div className="comment-list-wrapper well well-lg">
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