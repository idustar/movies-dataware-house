import {routerRedux} from 'dva/router';
import { hashHistory } from 'react-router';
import {fetchMovieById, fetchMovieComment} from "../../services/movie";

export default {
  namespace: 'search',
  state: {
    form: {
      title: '',
      like: false,
      actor: '',
      director: '',
      dates: [null, null],
      dateStr: ['', ''],
      genre: '',
    },
    url: '',
  },
  subscriptions: {
  },
  effects: {
    * search({ payload }, {call, put, select}) {
      yield put({ type: 'searchIt', payload: false });
      let url = yield select(state => state.search.url)
      yield call(hashHistory.push, `${url}`)
    },
    * searchFor({ payload: filter }, {call, put, select}) {
      yield put({ type: 'searchIt', payload: filter });
      let url = yield select(state => state.search.url)
      yield call(hashHistory.push, `${url}`)
    },
  },
  reducers: {
    changeFormValue(state, {payload: {key, value}}) {
      const form = state.form;
      form[key] = value;
      return {...state, form};
    },
    searchIt(state, { payload }) {
      const form = payload || state.form;
      let query = '';
      if (form.like) {
        if (form.title) {
          return { ...state, url: `/title/${encodeURIComponent(form.title)}/1` };
        }
      } else {
        if (form.title) query += `/title/${encodeURIComponent(form.title)}`;
        if (form.actor) query += `/actor/${form.actor}`;
        if (form.director) query += `/director/${form.director}`;
        if (form.genre) query += `/genre/${form.genre}`;
        if (payload) {
          if (form.start && form.end) query += `/date/${form.start}/${form.end}`;
        } else {
          if (form.dateStr[0] && form.dateStr[1]) query += `/date/${form.dateStr[0]}/${form.dateStr[1]}`;
        }
      }
      console.log(query);
      console.log('finish');
      return { ...state, url: `/movies/1${query}` };
    }
  },
}
