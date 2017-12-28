export function movieSelector(state, ownProps) {
  return {
    movie: state.movie.moviesById[ownProps.params.movieId],
    comments: state.movie.comments,
    commentPage: Number(state.movie.commentPage),
    commentTotalSize: state.movie.commentTotalSize,
  };
}


export function listSelector(state, ownProps) {
  const page = parseInt(ownProps.params.page || 1, 10);
  const {movieList, pageSize, size, filter} = state.movie;
  // const ids = lists[activeType].slice(itemsPerPage * (page - 1), itemsPerPage * page);
  // const items = ids.reduce((memo, id) => {
  //   if (itemsById[id]) memo.push(itemsById[id]);
  //   return memo;
  // }, []);
  const maxPage = Math.ceil(size / pageSize);
  const prev = 'movies/' + (page - 1) + '/' + ownProps.params.splat;
  const next = 'movies/' + (page + 1) + '/' + ownProps.params.splat;
  return {
    movieList,
    page,
    size,
    maxPage,
    prev,
    next,
    filter,
  };
}

export function actorlistSelector(state, ownProps) {
  const page = parseInt(ownProps.params.page || 1, 10);
  const {items, pageSize, size} = state.movie;
  const items_map = items.map(e => {
    return {
      link: e.coTimes > 1 ? `movies/1/actor/${e.actor}/director/${e.director}` : `movie/${e.productIds[0]}`,
      title: e.director,
      content: `coopreated in ${e.coTimes} movie${e.coTimes === 1 ? '' : 's'}`,
    }
  })
  const actor = ownProps.params.actor;
  const maxPage = Math.ceil(size / pageSize);
  const prev = 'actor/' + actor + '/' + (page - 1);
  const next = 'actor/' + actor + '/' + (page + 1);
  let header;
  header = `Actor ${actor}'s coopreation`;
  return {
    items: items_map,
    page,
    size,
    maxPage,
    prev,
    next,
    header,
  };
}
export function directorlistSelector(state, ownProps) {
  const page = parseInt(ownProps.params.page || 1, 10);
  const {items, pageSize, size} = state.movie;
  const items_map = items.map(e => {
    return {
      link: e.coTimes > 1 ? `movies/1/actor/${e.actor}/director/${e.director}` : `movie/${e.productIds[0]}`,
      title: e.actor,
      content: `coopreated in ${e.coTimes} movie${e.coTimes === 1 ? '' : 's'}`,
    }
  })
  const director = ownProps.params.director;
  const maxPage = Math.ceil(size / pageSize);
  const prev = 'director/' + director + '/' + (page - 1);
  const next = 'director/' + director + '/' + (page + 1);
  let header;
  header = `Director ${director}'s coopreation `;
  return {
    items: items_map,
    page,
    size,
    maxPage,
    prev,
    next,
    header,
  };
}

export function titlelistSelector(state, ownProps) {
  const page = parseInt(ownProps.params.page || 1, 10);
  const {items, pageSize, size} = state.movie;
  const items_map = items.map(e => {
    return {
      link: e.productIds.length === 1?`movie/${e.productIds[0]}`:`movies/1/title/${encodeURIComponent(e.title)}`,
      title: e.title,
      content: `${e.productIds.length} movie${e.productIds.length === 1 ? '' : 's'}`,
    }
  })
  const title = ownProps.params.title;
  const maxPage = Math.ceil(size / pageSize);
  const prev = 'title/' + title + '/' + (page - 1);
  const next = 'title/' + title + '/' + (page + 1);
  let header;
  if (title[title.length - 1] === '_')
    header = `Titles contains '${title.substr(0, title.length - 1)}'`;
  else
    header = `Titles start with '${title}'`;
  return {
    items: items_map,
    page,
    size,
    maxPage,
    prev,
    next,
    header,
  };
}

export function userSelector(state, ownProps) {
  return {
    user: ownProps.params.user,
    comments: state.movie.comments,
    commentPage: Number(state.movie.commentPage),
    commentTotalSize: state.movie.commentTotalSize,
  };
}

