import * as PostsAPI from '../utils/PostsAPI';
export const CAST_VOTE_ON_COMMENT = 'CAST_VOTE_ON_COMMENT';
export const LOAD_COMMENTS = 'LOAD_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

export function castVoteOnComment ({postId, commentId, vote}) {
  return {
    type: CAST_VOTE_ON_COMMENT,
    postId,
    commentId,
    vote,
  }
}

export const asyncCastVoteOnComment = ({postId, commentId, vote}) => dispatch => (
  PostsAPI
    .vote('comments',commentId, vote)
    .then(() => dispatch(castVoteOnComment({postId, commentId, vote})))
);


export const loadComments = ({postId, comments}) => ({
  type: LOAD_COMMENTS,
  postId,
  comments
});

export const fetchComments = (postId) => dispatch => (
  PostsAPI
    .getPostComments(postId)
    .then((comments) => dispatch(loadComments({postId, comments})))
);

export const addComment = ({comment, postId}) => ({
  type: ADD_COMMENT,
  postId,
  comment
});

export const editComment = ({comment, postId}) => ({
  type: EDIT_COMMENT,
  postId,
  comment
});

export const removeComment = ({postId, commentId}) => ({
  type: REMOVE_COMMENT,
  postId,
  commentId
});