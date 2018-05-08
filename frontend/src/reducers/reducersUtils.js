
//an entity here can be either a Post or a Comment
export function updateVotesForEntity(entities, entityId, vote) {

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