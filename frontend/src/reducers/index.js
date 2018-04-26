import * as Actions from '../actions';
import { combineReducers } from 'redux';

const initialPostsState = {
  posts: [],
  orderBy: 'voteScore'
}

const initialCommentsState = {}

function commentsReducer(state = initialCommentsState, action) {
  switch  (action.type) {
    case Actions.LOAD_COMMENTS:
      return {
        ...state,
        [action.postId]: action.comments
      }
    case Actions.CAST_VOTE_ON_COMMENT:
      return {
        ...state,
        [action.postId]: updateVotesForEntity(state[action.postId], action.commentId, action.vote)
      }
    case Actions.ADD_COMMENT:
      return {
        ...state,
        [action.postId]: [
          ...state[action.postId],
          action.comment
        ]
      }
    case Actions.EDIT_COMMENT:
      return {
        ...state,
        [action.postId]: updateComment(state[action.postId], action.comment.id, action.comment)
      }
    case Actions.REMOVE_COMMENT:
      return {
        ...state,
        [action.postId]: state[action.postId].filter((item) => item.id !== action.commentId)
      }
    default :
      return state;
  }
}

//an entity here can be either a Post or a Comment
function updateComment(entities, entityId, commentUpdater) {
  const entityIndex = entities.findIndex((item) => (item.id === entityId));

  return entities.map( (entity, index) => {
    if(index !== entityIndex) {
      return entity;
    }
    return {
      ...entity,
      body: commentUpdater.body,
      timestamp: commentUpdater.timestamp,
    };
  });
}

//an entity here can be either a Post or a Comment
function updatePost(entities, entityId, postUpdater) {
  const entityIndex = entities.findIndex((item) => (item.id === entityId));

  return entities.map( (entity, index) => {
    if(index !== entityIndex) {
      return entity;
    }
    return {
      ...entity,
      body: postUpdater.body,
      title: postUpdater.title,
      category: postUpdater.category,
      timestamp: postUpdater.timestamp
    };
  });
}

//an entity here can be either a Post or a Comment
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

function updateCommentCountForPost(entities, entityId, addOrRemove) {

  const entityIndex = entities.findIndex((item) => (item.id === entityId));

  const currentCommentCount = entities[entityIndex].commentCount;
  return entities.map( (entity, index) => {
    if(index !== entityIndex) {
      return entity;
    }
    return {
      ...entity,
      commentCount: addOrRemove ? currentCommentCount + 1 : currentCommentCount - 1
    };
  });
}

function postsReducer (state = initialPostsState, action) {

  switch  (action.type) {
    case Actions.CAST_VOTE_ON_POST:
      return {
        ...state,
        posts: updateVotesForEntity(state.posts, action.postId, action.vote)
      }
    case Actions.ADD_COMMENT:
      return {
        ...state,
        posts: updateCommentCountForPost(state.posts, action.postId, true)
      }
    case Actions.REMOVE_COMMENT:
      return {
        ...state,
        posts: updateCommentCountForPost(state.posts, action.postId, false)
      }
    case Actions.LOAD_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      }
    case Actions.LOAD_POSTS:
      return {
        ...state,
        posts: action.posts,
      }
    case Actions.LOAD_POST:
      return {
        ...state,
        posts: [
          ...state.posts,
          action.post
        ],
      }
    case Actions.ADD_POST:
      return {
        ...state,
        posts: [
          ...state.posts,
          action.post
        ],
      }
    case Actions.EDIT_POST:
      return {
        ...state,
        posts: updatePost(state.posts, action.post.id, action.post)
      }
    case Actions.REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter((item) => item.id !== action.postId)
      }
    case Actions.TOGGLE_ORDER:
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