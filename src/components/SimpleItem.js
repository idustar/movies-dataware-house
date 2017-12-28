import React, {PropTypes} from 'react';
import {Link} from 'dva/router';
import styles from './SimpleItem.less';
import {Card, Tooltip} from 'antd';
import { hashHistory } from 'react-router';

import {host, timeAgo} from '../utils/filters';


const SimpleItem = ({item}) => {

  const {
    link,
    title,
    content,
  } = item;

  const goto = () => {
    hashHistory.push(item.link);
  }

  return (
    <div className={styles.normal}>
      <Tooltip placement="bottom" title={title}>
      <Card title={title} bordered={false} onClick={goto}>{content}</Card>
      </Tooltip>
    </div>
  )
    ;
};

SimpleItem.propTypes = {
};

export default SimpleItem;
