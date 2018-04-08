import {CAST_VOTE_ON_POST, LOAD_POSTS, LOAD_POST, TOGGLE_ORDER, LOAD_COMMENTS} from '../actions';
import { combineReducers } from 'redux';

const initialPostsState = {
  posts: [],
  orderBy: 'voteScore'
}

const initialCommentsState = {
  comments: []
}

function commentsReducer(state = initialCommentsState, action) {
  switch  (action.type) {
    case LOAD_COMMENTS:
      return {
        ...state,
        [action.postId]: action.comments
        // comments: action.comments
      }
    default :
      return state;
  }
}

function postsReducer (state = initialPostsState, action) {

  switch  (action.type) {
    case CAST_VOTE_ON_POST:
      return {
        ...state,
        posts: updateVotesForPost(state.posts, action.postId, action.vote)
      }
    case LOAD_POSTS:
      return {
        ...state,
        posts: action.posts,//TODO: understand why this works (action's post property being accesible by 'post' label)
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
  commentsReducer
});