import React, {PropTypes} from 'react';
import {Link} from 'dva/router';
import { hashHistory } from 'react-router';
import styles from './MovieItem.less';
import {Card} from 'antd';
import movieDefaultImg from '../assets/images/movie.jpg'


import {host, timeAgo} from '../utils/filters';

const {Meta} = Card;

const MovieItem = ({item}) => {
  const {
    productId,
    actors,
    directors,
    title,
    medium_image_url,
  } = item;

  const gotoMovie = () => {
    hashHistory.push(`/movie/${productId}`)
  }

  return (
    <div className={styles.normal}>
      <div className={styles.container}>
      <div className={styles.poster} onClick={gotoMovie}>
        <img alt="example" className={styles.inner} src={item.medium_image_url || movieDefaultImg} />
      </div>
      <div className={styles.background}>
        <div onClick={gotoMovie} className={styles.title}>{item.title}
        <span className={styles.score}> ({parseInt(item.score*10)/10})</span></div>
        {item.directors.length ? (<div className={styles.meta}>
          <span>Directed by </span>
          {item.directors.map(item =>
            (<span key={item}><Link to={`/movies/1/director/${item}`} >{item}</Link>, </span>))}
        </div>) : null}
        {item.actors.length ? (<div className={styles.meta}>
          <span>Starred in: </span>
          {item.actors.map((item, index) => {
            if (index > 3) return null;
            if (index === 3) return (<span key={index}> etc.</span>);
            return (<span key={index}><Link to={`/movies/1/actor/${item}`}>{item}</Link>, </span>)
          })}
        </div>) : null}
      </div>
      </div>
      {/*<span className={styles.score}>{score}</span>*/}
      {/*<span className={styles.title}>*/}
      {/*{*/}
      {/*url*/}
      {/*? <span><a href={url} rel="noopener noreferrer" target="_blank">{title}</a><span className={styles.host}> ({host(url)})</span></span>*/}
      {/*: <Link to={`/item/${id}`}>{title}</Link>*/}
      {/*}*/}
      {/*</span>*/}
      {/*<br />*/}
      {/*<span className={styles.meta}>*/}
      {/*{*/}
      {/*type !== 'job'*/}
      {/*? <span className={styles.by}>by <Link to={`/user/${by}`}>{by}</Link></span>*/}
      {/*: null*/}
      {/*}*/}
      {/*<span className={styles.time}>{` ${timeAgo(time)}`} ago</span>*/}
      {/*{*/}
      {/*type !== 'job'*/}
      {/*? <span className={styles.commentsLink}>*/}
      {/*<span>{' | '}</span>*/}
      {/*<Link to={`/item/${id}`}>{descendants} comments</Link>*/}
      {/*</span>*/}
      {/*: null*/}
      {/*}*/}
      {/*</span>*/}
      {/*{*/}
      {/*type !== 'story'*/}
      {/*? <span className={styles.label}>{type}</span>*/}
      {/*: null*/}
      {/*}*/}
    </div>
  )
    ;
};

MovieItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default MovieItem;
