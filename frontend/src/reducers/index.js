import {CAST_VOTE_ON_POST, LOAD_POSTS, LOAD_POST, TOGGLE_ORDER, LOAD_COMMENTS, CAST_VOTE_ON_COMMENT} from '../actions';
import { combineReducers } from 'redux';

const initialPostsState = {
  posts: [],
  orderBy: 'voteScore'
}

const initialCommentsState = {}

function commentsReducer(state = initialCommentsState, action) {
  switch  (action.type) {
    case LOAD_COMMENTS:
      return {
        ...state,
        [action.postId]: action.comments
      }
    case CAST_VOTE_ON_COMMENT:
      return {
        ...state,
        [action.postId]: updateVotesForEntity(state[action.postId], action.commentId, action.vote)
      }
    default :
      return state;
  }
}

function updateVotesForEntity(entities, entityId, vote) {

  const entityIndex = entities.findIndex((item) => (item.id === entityId));

  const currentVote = entities[entityIndex].voteScore;
  return entities.map( (entity, index) => {
    if(index !== entityIndex) {
      return entity;
    }
    return {
      ...entity,
      voteScore: vote ? currentVote + 1 : currentVote - 1
    };
  });
}

function postsReducer (state = initialPostsState, action) {

  switch  (action.type) {
    case CAST_VOTE_ON_POST:
      return {
        ...state,
        posts: updateVotesForEntity(state.posts, action.postId, action.vote)
      }
    case LOAD_POSTS:
      return {
        ...state,
        posts: action.posts,
      }
    case LOAD_POST:
      return {
        ...state,
        posts: [
          ...state.posts,
          action.post
        ],
      }
    case TOGGLE_ORDER:
      console.log(state);
      return {
        ...state,
        orderBy: state.orderBy === action.orderBy ? '-' + state.orderBy : action.orderBy
      }
    default :
      return state;
  }
}

export default combineReducers({
  postsReducer,
  commentsReducer
});