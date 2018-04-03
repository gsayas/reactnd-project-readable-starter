import {CAST_VOTE_ON_POST, LOAD_POSTS} from '../actions';
import { combineReducers } from 'redux';

const initialPostsState = {someState: 'state'}

function postsReducer (state = initialPostsState, action) {
  const {postIndex, vote} = action

  switch  (action.type) {
    case CAST_VOTE_ON_POST:
      // let newState = JSON.parse(JSON.stringify(state));
      // // let newState = state;
      // let currentVote = newState.posts[postIndex].voteScore;
      // newState.posts[postIndex].voteScore = vote ? currentVote + 1 : currentVote - 1;
      // return newState;

      return {
        ...state,
        posts: updateVotesForPost(state.posts, postIndex, vote)
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

function updateVotesForPost(posts, postIndex, vote) {
  let currentVote = posts[postIndex].voteScore;
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