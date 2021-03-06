import {api, headers} from "./APIConfig";

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getPost = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(throwHttpErrors)
    .then(res => res.json())
    .then(data => {return data.id !== undefined ? data : throwNotFoundError()})

export const getPostComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)

export const vote = (entityType, entityId, vote) =>
  fetch(`${api}/${entityType}/${entityId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option: vote ? 'upVote' : 'downVote'})
  }).then(res => res.json())

export const savePost = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({...post})
  }).then(res => res.json())

export const updatePost = (post) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({...post})
  }).then(res => res.json())

export const deletePost = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
  }).then(res => res.json())

export const saveComment = (comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({...comment})
  }).then(res => res.json())

export const updateComment = (comment) =>
  fetch(`${api}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({...comment})
  }).then(res => res.json())

export const deleteComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
  }).then(res => res.json())

export const getUUID = () => {
  return Math.random().toString(36).substring(2)+(new Date()).getTime().toString(36);
}

const throwHttpErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

const throwNotFoundError = () => {
  throw Error('Page Not Found');
}