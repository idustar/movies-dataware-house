import pathToRegexp from 'path-to-regexp';
import {
  fetchMovieById, fetchMoviesByActor, fetchMoviesByDateRange, fetchMoviesByTitleLike,
  fetchMoviesByTitle, fetchMoviesByDirector, fetchMoviesByGenre, fetchMovieComment, fetchUserComment,
  fetchMovies, fetchMoviesByTitleContain, fetchMoviesCom, fetchMoviesById, fetchActors, fetchDirectors
} from '../../services/movie';

export default {
  namespace: 'movie',
  state: {
    moviesById: {},
    movieList: [],
    size: 0,
    ids: [],
    items: [],
    commentPage: 1,
    commentTotalSize: 1,
    pageSize: 20,
    comments: [],
    filter: {},
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname}) => {
        let match = pathToRegexp('/movie/:movieId').exec(pathname);
        if (match) {
          const movieId = match[1];
          dispatch({type: 'fetchMovie', payload: movieId});
          return;
        }
        match = pathToRegexp('/user/:user/:page').exec(pathname);
        if (match) {
          const [, user, page] = match;
          dispatch({type: 'fetchCommentsByUser', payload: {id: user, page}});
          return;
        }
        match = pathToRegexp('/title/:title/:page').exec(pathname);
        if (match) {
          const [, title, page] = match;
          dispatch({type: 'fetchTitleLike', payload: {title: decodeURIComponent(title), page}});
          return;
        }
        match = pathToRegexp('/com/:director/:actor/:page').exec(pathname);
        if (match) {
          const [, director, actor, page] = match;
          dispatch({type: 'fetchCom', payload: {director, actor, page}});
          return;
        }
        match = pathToRegexp('/actor/:actor/:page').exec(pathname);
        if (match) {
          const [, actor, page] = match;
          dispatch({type: 'fetchActorCom', payload: {actor, page}});
          return;
        }
        match = pathToRegexp('/director/:director/:page').exec(pathname);
        if (match) {
          const [, director, page] = match;
          dispatch({type: 'fetchDirectorCom', payload: {director, page}});
          return;
        }
        match = pathToRegexp('/movies/:page/*').exec(pathname);
        // dispatch({ type: 'saveMovies', payload: {} });
        // console.log(match)
        let [title, start, end, genre, director, actor, tt] = ['', '', '', '', '', '', ''];
        if (match) {
          const info = match[2].split('/')
          console.log(info)
          const len = info.length;
          const page = match[1];
          let i = 0;
          while (i < len) {
            switch (info[i]) {
              case 'title':
                title = decodeURIComponent(info[i + 1]);
                i += 2;
                break;
              case 'tt':
                tt = decodeURIComponent(info[i + 1]);
                i += 2;
                break;
              case 'date':
                start = info[i + 1];
                end = info[i + 2];
                i += 3;
                break;
              case 'actor':
                actor = info[i + 1];
                i += 2;
                break;
              case 'director':
                director = info[i + 1];
                i += 2;
                break;
              case 'genre':
                genre = info[i + 1];
                i += 2;
                break;
              default:
                i += 2;
                break;
            }
          }
          console.log('go')
          console.log({title, start, end, tt, actor, director, genre, page, len})
          dispatch({type: 'fetchMovies', payload: {title, tt, start, end, actor, director, genre, page, len}});
        }
      });
    },
  },
  effects: {
    * fetchMovie({payload: id}, {call, put}) {
      const movie = yield call(fetchMovieById, {id});
      yield put({type: 'saveMovie', payload: movie});
      yield put({type: 'fetchComments', payload: {id, page: 1}})
    },
    * fetchComments({payload: {id, page}}, {call, put}) {
      const comments = yield call(fetchMovieComment, {id, page});
      yield put({type: 'saveComments', payload: {comments, page}});
    },
    * fetchCommentsByUser({payload: {id, page}}, {call, put}) {
      const comments = yield call(fetchUserComment, {id, page});
      yield put({type: 'saveComments', payload: {comments, page}});
    },
    * fetchMovies({payload: {title, start, end, tt, actor, director, genre, page, len}}, {call, put}) {
      let movies = [];
      if (len < 4) {
        if (tt) {
          movies = yield call(fetchMoviesByTitleLike, {tt, page});
        } else if (title) {
          movies = yield call(fetchMoviesByTitle, {title, page});
        } else if (start) {
          movies = yield call(fetchMoviesByDateRange, {start, end, page});
        } else if (actor) {
          movies = yield call(fetchMoviesByActor, {actor, page});
        } else if (director) {
          movies = yield call(fetchMoviesByDirector, {director, page});
        } else if (genre) {
          movies = yield call(fetchMoviesByGenre, {genre, page});
        }
      } else {
        movies = yield call(fetchMovies, {
          page,
          query: {
            actors: actor ? [actor] : [],
            directors: director ? [director] : [],
            genres: genre? [genre] : [],
            titles: title? [title] : [],
            dateRanges: start? [{startDate: start, endDate: end}] : [],
          },
        });
      }
      yield put({type: 'saveMovies', payload: {movies, filter: {title, start, end, actor, director, genre, len}}});
    },
    * fetchTitleLike({payload: {title, page}}, {call, put}) {
      let items;
      if (title[title.length - 1] === '_')
        items = yield call(fetchMoviesByTitleContain, {title: title.substr(0, title.length-1), page});
      else
        items = yield call(fetchMoviesByTitleLike, {title, page});
      yield put({type: 'saveItems', payload: {items}});
    },
    * fetchActorCom({payload: {actor, page}}, {call, put}) {
      const items = yield call(fetchActors, {actor, page});
      yield put({type: 'saveItems', payload: {items}});
    },
    * fetchDirectorCom({payload: {director, page}}, {call, put}) {
      const items = yield call(fetchDirectors, {director, page});
      yield put({type: 'saveItems', payload: {items}});
    },
    * fetchCom({payload: {director, actor, page}}, {call, put}) {
      const ids = yield call(fetchMoviesCom, {director, actor, page})
      try {
        yield put({type: 'saveIds', payload: ids.data.result[0].productIds})
      } catch (e) {
        yield put({type: 'saveIds', payload: []})
      }
      yield put({type: 'fetchMoviesByIds', payload: {director, actor}})
    },
    * fetchMoviesByIds({payload: filter}, {call, put, select}) {
      const ids = yield select(state => state.movie.ids)
      let movies
      if (ids && ids.length)
        movies = yield call(fetchMoviesById, {ids})
      else
        movies = []
      yield put({type: 'saveMovies', payload: {movies, filter}})
    },
  },
  reducers: {
    saveMovie(state, {payload: movie}) {
      return {...state, moviesById: {...state.moviesById, [movie.data.productId]: movie.data}};
    },
    saveMovies(state, {payload: {movies, filter}}) {
      let size = 0;
      if (movies && movies.data && movies.data.result) {
        size = movies.data.size ? movies.data.size : 0;
      }
      return {...state, movieList: movies.data && movies.data.result ? movies.data.result : [],
        size, filter: {...state.filter, ...filter}};
    },
    saveIds(state, {payload: ids}) {
      return {...state, ids};
    },
    saveItems(state, {payload: {items}}) {
      let size = 0;
      if (items && items.data && items.data.result) {
        size = items.data.size;
      }
      return {...state, items: items.data && items.data.result ? items.data.result : [], size};
    },
    saveComments(state, {payload: {comments, page}}) {
      return {
        ...state, comments: comments.data.result || [],
        commentTotalSize: comments.data.size,
        commentPage: page
      };
    },
  },
}
