import {routerRedux} from 'dva/router';
import {fetchStatByType} from "../../services/movie";

export default {
  namespace: 'stat',
  state: {
    data: [],
    state: 'year',
  },
  subscriptions: {
  },
  effects: {
    * fetchData({ payload: type }, {call, put, select}) {
      const data = yield call(fetchStatByType, {type});
      yield put({ type: 'saveData', payload: {data, type} });
    },
  },
  reducers: {
    saveData(state, { payload: {data, type} }) {
      return { ...state, data: data.data, type };
    },
  }
}
