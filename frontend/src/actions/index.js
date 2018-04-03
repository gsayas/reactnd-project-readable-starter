import * as PostsAPI from '../utils/PostsAPI';
export const CAST_VOTE_ON_POST = 'CAST_VOTE_ON_POST';
export const LOAD_POSTS = 'LOAD_POSTS';

export function castVoteOnPost ({post, vote}) {
  return {
    type: CAST_VOTE_ON_POST,
    post,
    vote,
  }
}

export const loadPosts = posts => ({
  type: LOAD_POSTS,
  posts
});

export const fetchPosts = () => dispatch => (
  PostsAPI
    .getAllPosts()
    .then((posts) => dispatch(loadPosts(posts)))
);