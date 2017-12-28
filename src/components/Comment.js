import React, {Component, PropTypes} from 'react';
import {Link} from 'dva/router';
import {Avatar, Row, Col, Tag, Rate, Icon, Modal} from 'antd';
import styles from './Comment.less';
import {timeAgo} from '../utils/filters';

const info = Modal.info;

// function pluralize(n) {
//   return n + (n === 1 ? ' reply' : ' replies');
// }


class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  getLocalTime = (nS) => {
    return new Date(parseInt(nS, 10) * 1000).toLocaleDateString()
  }

  showDetail = () => {
    info({
      title: `${this.props.comment.userId}'s comment`,
      content: (
        <div>
          <div className={styles.commentChildren} dangerouslySetInnerHTML={{
            __html: this.props.comment.text
          }}></div>
        </div>
      ),
      onOk() {},
    });
  }

  handleExpand = (e) => {
    e.preventDefault();
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    const {comment, user} = this.props;
    const {open} = this.state;
    if (!comment) return null;

    return (
      <div className={styles.normal} >


        <div className={styles.by}>
          <Row>
            <Col span={2} offset={1}>

              <Avatar size="large" className={styles.avatar}>{comment.profileName.substring(0, 1)}</Avatar>
            </Col>
            <Col span={21}>
              <Link className={styles.username} to={`/user/${comment.userId}/1`}>{comment.profileName}</Link><span>&nbsp;</span>
              <Tag>{this.getLocalTime(comment.time)}</Tag>
              <div onClick={this.showDetail}>
              <Rate className={styles.rate} allowHalf disabled defaultValue={comment.score} />
              <span className={styles.meta}>{comment.score} stars</span>
              </div>
              <div className={styles.content} onClick={this.showDetail}>
                {comment.summary}
              </div>
              <Icon type="like-o" /> <span>{comment.helpfulCnt}&nbsp;&nbsp;&nbsp;</span>
              <Icon type="dislike-o" /> <span>{comment.rateCnt - comment.helpfulCnt}</span>&nbsp;&nbsp;&nbsp;&nbsp;
              {user?<Link to={`/movie/${comment.productId}`}>view the source movie</Link>:null}

            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Comment;
