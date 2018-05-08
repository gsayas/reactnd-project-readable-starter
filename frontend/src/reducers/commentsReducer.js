import * as Actions from "../actions/commentsActions.js";
import {updateVotesForEntity} from "./commonUtils";

const initialCommentsState = {}

export function commentsReducer(state = initialCommentsState, action) {
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