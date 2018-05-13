import * as PostsAPI from '../utils/PostsAPI';
import {
  CAST_VOTE_ON_POST,
  LOAD_POSTS,
  LOAD_POST,
  TOGGLE_ORDER,
  ADD_POST,
  EDIT_POST,
  REMOVE_POST,
  LOAD_CATEGORIES,
  REPORT_REPORT,
  CLEAR_ERRORS
} from '../actions/types.js';

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

export const loadPosts = posts => ({
  type: LOAD_POSTS,
  posts
});

export const loadCategories = categories => ({
  type: LOAD_CATEGORIES,
  categories
});

export const fetchPosts = () => dispatch => (
  PostsAPI
    .getAllPosts()
    .then((posts) => dispatch(loadPosts(posts)))
);

export const fetchPost = (postId) => dispatch => (
  PostsAPI
    .getPost(postId)
    .then((post) => dispatch(loadPost(post)))
    .catch(error => dispatch(reportError('Post not found')))
);

export const loadPost = post => ({
  type: LOAD_POST,
  post
});

export const reportError = error => ({
  type: REPORT_REPORT,
  error
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});

export function toggleOrder ({orderBy}) {
  return {
    type: TOGGLE_ORDER,
    orderBy
  }
}

export const addPost = ({post}) => ({
  type: ADD_POST,
  post
});

export const editPost = ({post}) => ({
  type: EDIT_POST,
  post
});

export const removePost = ({postId}) => ({
  type: REMOVE_POST,
  postId
});