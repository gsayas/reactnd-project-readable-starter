import * as PostsAPI from '../utils/PostsAPI';
export const CAST_VOTE_ON_POST = 'CAST_VOTE_ON_POST';
export const CAST_VOTE_ON_COMMENT = 'CAST_VOTE_ON_COMMENT';
export const LOAD_POSTS = 'LOAD_POSTS';
export const LOAD_POST = 'LOAD_POST';
export const LOAD_COMMENTS = 'LOAD_COMMENTS';
export const TOGGLE_ORDER = 'TOGGLE_ORDER';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

export function castVoteOnPost ({postId, vote}) {
  return {
    type: CAST_VOTE_ON_POST,
    postId,
    vote,
  }
}

export const asyncCastVoteOnPost = ({postId, vote}) => dispatch => (
  PostsAPI
    .vote('posts',postId, vote)
    .then(() => dispatch(castVoteOnPost({postId, vote})))
);

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

export const loadPosts = posts => ({
  type: LOAD_POSTS,
  posts
});

export const fetchPosts = () => dispatch => (
    PostsAPI
      .getAllPosts()
      .then((posts) => dispatch(loadPosts(posts)))
);

export const loadPost = post => ({
  type: LOAD_POST,
  post
});

export function toggleOrder ({orderBy}) {
  return {
    type: TOGGLE_ORDER,
    orderBy
  }
}

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