import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './UserPage.less';
import Layout from '../components/Layout';
import { userSelector } from '../models/movies/selectors';
import Spinner from '../components/Spinner';
import CommentList from '../components/CommentList';

class UserPage extends Component {
  componentDidMount() {
    this.node.scrollIntoView();
  }
  renderUser() {
    const { loading, user, comments, commentPage, commentTotalSize, dispatch } = this.props;
    return (
      <div>
        <h1 ref={node => this.node = node}>[User] {user}</h1>
        <CommentList
          comments={comments} commentPage={commentPage} dispatch={dispatch}
          commentTotalSize={commentTotalSize} user={user} movie={null}/>
      </div>
    );
  }
  render() {
    const { loading, user, comments, commentPage, commentTotalSize } = this.props;
    return (
      <Layout loading={loading}>
        <div className={styles.normal}>
          <Spinner loading={loading}/>
          {user ? this.renderUser() : null}
        </div>
      </Layout>
    );
  }
}

UserPage.propTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.global,
    ...userSelector(state, ownProps),
  };
}

export default connect(mapStateToProps)(UserPage);
