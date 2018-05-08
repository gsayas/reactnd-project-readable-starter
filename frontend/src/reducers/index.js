import {combineReducers} from 'redux';
import {commentsReducer} from './commentsReducer.js';
import {postsReducer} from './postsReducer.js';

export default combineReducers({
  postsReducer,
  commentsReducer
});