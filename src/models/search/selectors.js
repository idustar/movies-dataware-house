export function searchSelector(state, ownProps) {
  return {
    form: state.search.form,
    data: state.stat.data,
  };
}

