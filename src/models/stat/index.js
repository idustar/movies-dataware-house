import {routerRedux} from 'dva/router';
import {fetchStatByType} from "../../services/movie";

export default {
  namespace: 'stat',
  state: {
    data: [],
    state: 'year',
    startQuery: null,
    endQuery: null,
    hiveTime: null,
  },
  subscriptions: {},
  effects: {
    * fetchData({payload: type}, {call, put, select}) {
      yield put({type: 'startData'});
      const data = yield call(fetchStatByType, {type});
      yield put({type: 'saveData', payload: {data, type}});
      yield put({type: 'endData'});
    },
  },
  reducers: {
    saveData(state, {payload: {data, type}}) {
      return {...state, data: data.data, type, endQuery: new Date()};
    },
    startData(state) {
      return {...state, startQuery: new Date(), endQuery: null, hiveTime: null};
    },
    endData(state, {payload: endTime}) {
      return {...state, hiveTime: endTime};
    }
  }
}
