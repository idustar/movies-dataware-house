import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import styles from './ListPage.less';
import {titlelistSelector, actorlistSelector, directorlistSelector} from '../models/movies/selectors';
import Layout from '../components/Layout';
import SimpleList from "../components/SimpleList";

function SimpleListPage({
                          loading, items, page, maxPage, size,
                          header, location, dispatch, prev, next
                        }) {
  return (
    <Layout loading={loading}>
      <div className={styles.normal}>
        <SimpleList
          loading={loading}
          items={items}
          page={page}
          prev={prev}
          next={next}
          size={size}
          header={header}
          maxPage={maxPage}
          location={location}
          dispatch={dispatch}
        />
      </div>
    </Layout>
  );
}

SimpleListPage.propTypes = {};

function mapStateToProps(state, ownProps) {
  let selector;
  if (ownProps.params.title)
    selector = titlelistSelector(state, ownProps)
  else if (ownProps.params.actor)
    selector = actorlistSelector(state, ownProps)
  else if (ownProps.params.director)
    selector = directorlistSelector(state, ownProps)
  return {
    loading: state.loading.global,
    ...selector,
  };
}

export default connect(mapStateToProps)(SimpleListPage);
