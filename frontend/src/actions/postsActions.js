import * as PostsAPI from '../utils/PostsAPI';
import {
  CAST_VOTE_ON_POST,
  LOAD_POSTS,
  LOAD_POST,
  TOGGLE_ORDER,
  ADD_POST,
  EDIT_POST,
  REMOVE_POST,
  LOAD_CATEGORIES
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

export const loadPost = post => ({
  type: LOAD_POST,
  post
});

export const fetchPost = (postId) => dispatch => (
  PostsAPI
    .getPost(postId)
    .then((post) => dispatch(loadPost(post)))
    .catch(error => console.log(error))
);

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