import * as Actions from "../actions/postsActions.js";
import {ADD_COMMENT, REMOVE_COMMENT} from "../actions/commentsActions";
import {updateVotesForEntity} from "./commonUtils";

const initialPostsState = {
  posts: [],
  orderBy: 'voteScore'
}

export function postsReducer (state = initialPostsState, action) {

  switch  (action.type) {
    case Actions.CAST_VOTE_ON_POST:
      return {
        ...state,
        posts: updateVotesForEntity(state.posts, action.postId, action.vote)
      }
    case ADD_COMMENT:
      return {
        ...state,
        posts: updateCommentCountForPost(state.posts, action.postId, true)
      }
    case REMOVE_COMMENT:
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