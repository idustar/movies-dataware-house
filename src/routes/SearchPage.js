import React from 'react';
import {connect} from 'dva';

import styles from './SearchPage.less';
import Layout from '../components/Layout';
import GenreChart from '../components/GenreChart';
import StatChart3 from '../components/StatChart3';
import Search from '../components/Search';
import {statSelector} from "../models/stat/selectors";


class SearchPage extends React.Component {
  componentDidMount() {
    if (this.props.type !== 'month') {
      this.props.dispatch({
        type: 'stat/fetchData',
        payload: 'month',
      });
    }
  }

  render() {
    const extraContent = (
      <div>
        <div className={styles.extraContent}>
          <div className={styles.statItem}>
            <p>Movies</p>
            <p>253059</p>
          </div>
          <div className={styles.statItem}>
            <p>Genres</p>
            <p>584</p>
          </div>
          <div className={styles.statItem}>
            <p>Directors</p>
            <p>41857</p>
          </div>
        </div>
        <div className={styles.extraContent}>
          <div className={styles.statItem}>
            <p>Actors</p>
            <p>140474</p>
          </div>
          <div className={styles.statItem}>
            <p>Comments</p>
            <p>7911684</p>
          </div>
          <div className={styles.statItem}>
            <p>Users</p>
            <p>889176</p>
          </div>
        </div>
      </div>
    );
    return (
      <Layout loading={this.props.loading}>
        <div className={styles.normal}>
          <div className={styles.header}>
            <div className={styles.titlebar}>
              <div>
                <h1>Amazon Movies</h1>
                {extraContent}
              </div>
              <div className={styles.stat}>
              <StatChart3
                type={"month"} data={this.props.data}/>
              </div>
            </div>
          </div>


          <div className={styles.card}>
            <h2>Search</h2>
            <Search simple={false}/>
          </div>
        </div>

        <div className={styles.card}>
          <h2>Genres</h2>
          <GenreChart/>
        </div>
      </Layout>
    );
  }
}

SearchPage.propTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.global,
    data: state.stat.data,
    type: state.stat.type,
  };
}

export default connect(mapStateToProps)(SearchPage);
