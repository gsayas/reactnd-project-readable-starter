import * as PostsAPI from '../utils/PostsAPI';
export const CAST_VOTE_ON_POST = 'CAST_VOTE_ON_POST';
export const LOAD_POSTS = 'LOAD_POSTS';
export const LOAD_POST = 'LOAD_POST';
export const TOGGLE_ORDER = 'TOGGLE_ORDER';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';

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