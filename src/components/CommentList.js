import React, {PropTypes} from 'react';
import {Link} from 'dva/router';
import {Pagination, Affix} from 'antd';
import styles from './CommentList.less';

import Comment from '../components/Comment';

const CommentList = ({comments, commentPage, commentTotalSize, dispatch, movie, user}) => {
  const changeCommentPage = (page, pageSize) => {
    console.log(page, pageSize)
    if (movie)
      dispatch({ type: 'movie/fetchComments', payload: {id: movie, page} });
    else
      dispatch({ type: 'movie/fetchCommentsByUser', payload: {id: user, page} });
  }

  return (
    <div className={styles.comments}>
      <Affix offsetTop={50}>
      <p className={styles.commentsHeader}>
        {commentTotalSize ? `${commentTotalSize} COMMENTS` : 'No Comments yet.'}
      </p>
      </Affix>
      <div className={styles.commentChildren}>
        {comments ? comments.map(comment =>
          <Comment key={comment.id} id={comment.id} comment={comment} user={user} />) : null}
      </div>
      <Pagination className={styles.pagination} current={commentPage} total={commentTotalSize} pageSize={10} onChange={changeCommentPage}/>
    </div>
  )
};

CommentList.propTypes = {
};

export default CommentList;
