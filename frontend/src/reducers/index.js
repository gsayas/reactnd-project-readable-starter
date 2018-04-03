import {CAST_VOTE_ON_POST, LOAD_POSTS} from '../actions';
import { combineReducers } from 'redux';

const initialPostsState = {someState: 'state'}

function postsReducer (state = initialPostsState, action) {
  const {post, vote} = action

  switch  (action.type) {
    case CAST_VOTE_ON_POST:
      return {
        ...state,
        [post.id]: {
          ...state[post.id],
          voteScore: 88,
        }
      }
    case LOAD_POSTS:
      console.log('hola');
      return {
        ...state,
        anda: action.posts,
        hola: 'hola mundo'
      }
    default :
      return state;
  }
}

export default combineReducers({
  postsReducer,
});