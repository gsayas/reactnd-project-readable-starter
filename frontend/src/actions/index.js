export const CAST_VOTE_ON_POST = 'CAST_VOTE_ON_POST';

export function castVoteOnPost ({post, vote}) {
  return {
    type: CAST_VOTE_ON_POST,
    post,
    vote,
  }
}