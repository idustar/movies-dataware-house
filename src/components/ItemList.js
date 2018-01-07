import React, {PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Link} from 'dva/router';
import Masonry from 'react-masonry-component';
import {Popover} from 'antd';
import styles from './ItemList.less';
import Spinner from './Spinner';
import MovieItem from './MovieItem';
import {Row, Col, Tag} from 'antd';
import StatChart2 from './StatChart2';


const ItemList = ({loading, items, page, maxPage, location, prev, next, size, filter, dispatch, sqlTime, hiveTime}) => {
  const delTag = (type, e) => {
    const ft = filter;
    ft[type] = '';
    if (type === 'start') {
      ft.end = '';
    }
    dispatch({type: 'search/searchFor', payload: ft})
  }

  const content = (
    <div className={styles.popov}>
    </div>
  );

  const extraContent = (
    <div className={styles.extraContent}>
      <div className={styles.statItem}>
        <p>MySQL</p>
        <p>{sqlTime}s</p>
      </div>
      <div className={styles.statItem}>
        <p>Hive</p>
        <p>{hiveTime || '-'}s</p>
      </div>
    </div>
  );
  return (
    <div className={styles.normal}>
      <Spinner loading={loading}/>
      <div className={styles.nav}>
        <div className={styles['nav-container']}>
          <div className={styles.route}>Search Result</div>
          <div>
            {
              page > 1
                ? <Link to={`/${prev}`}>&lt; prev</Link>
                : <a className={styles.disabled}>&lt; prev</a>
            }
            <span>{`${page}/${maxPage}`}</span>
            {
              page < maxPage
                ? <Link to={`/${next}`}>more &gt;</Link>
                : <a className={styles.disabled}>more &gt;</a>
            }
          </div>
          {size > 0 ? <div className={styles.right}>{size} movie{size >= 1 ? 's' : ''} in total &nbsp;</div> :
            <div className={styles.right}>No results yet</div>}
        </div>
      </div>


      <div className={styles.header}>
        <div>
          {filter.actor ? <div>
            <Tag color="#f50" closable onClose={(e) => delTag('actor', e)}>Actor</Tag>
            <h1>{filter.actor}</h1> <Link to={`actor/${filter.actor}/1`}>(View his/her coopreation)</Link>
          </div> : null}
          {filter.director ? <div>
            <Tag color="#108ee9" closable onClose={(e) => delTag('director', e)}>Director</Tag>
            <h1>{filter.director}</h1> <Link to={`director/${filter.director}/1`}>(View his/her coopreation)</Link>
          </div> : null}
          {filter.title ? <div>
            <Tag color="#87d068" closable onClose={(e) => delTag('title', e)}>Title</Tag>
            <h1>{filter.title}</h1>
          </div> : null}
          {filter.tt ? <div>
            <Tag color="#87d068" closable onClose={(e) => delTag('tt', e)}>Title</Tag>
            <h1>%{filter.tt}%</h1>
          </div> : null}
          {filter.genre ? <div>
            <Tag color="gold" closable onClose={(e) => delTag('genre', e)}>Genre</Tag>
            <h1>{filter.genre}</h1>
          </div> : null}
          {filter.start ? <div>
            <Tag color="lime" closable onClose={(e) => delTag('start', e)}>Date Range</Tag>
            <h1>{filter.start} ~ {filter.end}</h1>
          </div> : null}
        </div>
        <Popover content={content} placement="bottomRight" title="Time Comparison" trigger="hover">
        {extraContent}
        </Popover>
      </div>

      <div className={styles.results}>
        {items && items.length ?
          <Row gutter={0}>
            <Masonry
              className={styles.gallery} // default ''
              elementType={'div'} // default 'div'
              options={{transitionDuration: 5}} // default {}
              disableImagesLoaded={false} // default false
              updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
            >
              {
                items.map(item =>
                  <Col
                    xs={{span: 8}} lg={{span: 6}} key={item.productId}>
                    <MovieItem className={styles.item} item={item}/></Col>)
              }
            </Masonry></Row> : (loading ?
            <div className={styles.tip}>Searching...</div> :
            <div className={styles.tip}>Not Found</div>)
        }
      </div>
    </div>
  );
};
export default ItemList;
