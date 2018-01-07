export function statSelector(state, ownProps) {
  return {
    data: state.stat.data,
    curType: state.stat.type,
    sqlTime: (state.stat.startQuery && state.stat.endQuery) ? (state.stat.endQuery - state.stat.startQuery) / 1000 : '-',
    hiveTime: state.stat.hiveTime ? state.stat.hiveTime / 1000 : '-',
  };
}

