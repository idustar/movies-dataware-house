import React, {PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Link} from 'dva/router';
import {Breadcrumb} from 'antd';
import styles from './SimpleList.less';
import Spinner from './Spinner';
import SimpleItem from './SimpleItem';
import {Row, Col, Tag} from 'antd';
import Masonry from 'react-masonry-component';


const SimpleList = ({
                      loading, items, header,
                      page, prev, next, maxPage, size, activeType, location, dispatch
                    }) => {
  return (
    <div className={styles.normal}>
      <Spinner loading={loading}/>
      <div className={styles.nav}>
        <div className={styles['nav-container']}>
          <div className={styles.route}>{header}</div>
          <div>
            {
              page > 1
                ? <Link to={prev}>&lt; prev</Link>
                : <a className={styles.disabled}>&lt; prev</a>
            }
            <span>{`${page}/${maxPage}`}</span>
            {
              page < maxPage
                ? <Link to={next}>more &gt;</Link>
                : <a className={styles.disabled}>more &gt;</a>
            }
          </div>
          {size > 0 ? <div className={styles.right}>{size} item{size >= 1 ? 's' : ''} in total &nbsp;</div> :
            <div className={styles.right}>No results yet</div>}
        </div>
      </div>


      <div className={styles.results}>
        {items && items.length ?
          <Row gutter={0}>
            <Masonry
              className={styles.gallery} // default ''
              elementType={'div'} // default 'div'
              options={{transitionDuration: 0, transitionProperty: ''}} // default {}
              disableImagesLoaded={false} // default false
              updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
            >
              {
                items.map((item, index) => <Col xs={{span: 8}} lg={{span: 6}} key={index}>
                  <SimpleItem className={styles.item} item={item}/></Col>)
              }
            </Masonry></Row> : (loading ?
            <div className={styles.tip}>Searching...</div> :
            <div className={styles.tip}>Not Found</div>)
        }
      </div>
    </div>
  );
};

export default SimpleList;
