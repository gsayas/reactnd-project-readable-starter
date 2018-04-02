import {CAST_VOTE_ON_POST} from '../actions';
import { combineReducers } from 'redux';

const initialPostsState = {}

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
    default :
      return state;
  }
}

export default combineReducers({
  postsReducer,
});