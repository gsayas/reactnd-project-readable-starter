import {CAST_VOTE_ON_POST, LOAD_POSTS} from '../actions';
import { combineReducers } from 'redux';

const initialPostsState = {someState: 'state'}

function postsReducer (state = initialPostsState, action) {
  const {postId, vote} = action;

  switch  (action.type) {
    case CAST_VOTE_ON_POST:
      return {
        ...state,
        posts: updateVotesForPost(state.posts, postId, vote)
      }
    case LOAD_POSTS:
      return {
        ...state,
        posts: action.posts,
      }
    default :
      return state;
  }
}

function updateVotesForPost(posts, postId, vote) {

  const postIndex = posts.findIndex((item) => (item.id === postId));

  const currentVote = posts[postIndex].voteScore;
  return posts.map( (post, index) => {
    if(index !== postIndex) {
      return post;
    }
    return {
      ...post,
      voteScore: vote ? currentVote + 1 : currentVote - 1
    };
  });
}

export default combineReducers({
  postsReducer,
});