import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import styles from './ListPage.less';
import {titlelistSelector} from '../models/movies/selectors';
import Layout from '../components/Layout';
import SimpleList from "../components/SimpleList";

function SimpleListPage({
                          loading, items, page, maxPage, size,
                          header, location, dispatch, prev, next
                        }) {
  return (
    <Layout>
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
  return {
    loading: state.loading.global,
    ...titlelistSelector(state, ownProps),
  };
}

export default connect(mapStateToProps)(SimpleListPage);
