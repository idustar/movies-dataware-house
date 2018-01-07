import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './ListPage.less';
import { listSelector } from '../models/movies/selectors';
import ItemList from '../components/ItemList';
import Layout from '../components/Layout';

function ListPage({ loading, movieList, size, page, maxPage, location,
                    prev, next, filter, dispatch, sqlTime, hiveTime }) {
  return (
    <Layout loading={loading}>
      <div className={styles.normal}>
        <ItemList
          loading={loading}
          items={movieList}
          page={page}
          size={size}
          maxPage={maxPage}
          location={location}
          prev={prev}
          next={next}
          filter={filter}
          dispatch={dispatch}
          sqlTime={sqlTime}
          hiveTime={hiveTime}
        />
      </div>
    </Layout>
  );
}

ListPage.propTypes = {
};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.global,
    ...listSelector(state, ownProps),
  };
}

export default connect(mapStateToProps)(ListPage);
