export function statSelector(state, ownProps) {
  return {
    data: state.stat.data,
    curType: state.stat.type
  };
}

