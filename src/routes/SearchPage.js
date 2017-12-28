import React from 'react';
import {} from 'antd';

import styles from './SearchPage.less';
import Layout from '../components/Layout';
import Search from '../components/Search';

class SearchPage extends React.Component {
  render() {
    return (
      <Layout>

        <div className={styles.normal}>
          <div className={styles.header}>
            <div className={styles.titlebar}>
              <h1>Search</h1>
              <span className={styles.meta}></span>
            </div>
          </div>


          <div className={styles.card}>
            <Search simple={false} />
          </div>
        </div>


      </Layout>
    );
  }
}

SearchPage.propTypes = {};

export default SearchPage;
