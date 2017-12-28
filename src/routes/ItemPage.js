import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {Rate, Row, Col, Tag, Affix } from 'antd';
import {Link} from 'dva/router';
import styles from './ItemPage.less';
import {movieSelector} from '../models/movies/selectors';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';

import movieDefaultImg from '../assets/images/movie.jpg'
import CommentList from '../components/CommentList';

function ItemPage({loading, movie, comments, commentPage, commentTotalSize, dispatch}) {
  if (!movie) return null;
  return (
    <Layout loading={loading}>

      <div className={styles.normal}>
        <Spinner loading={loading}/>
        <div className={styles.header}>
          <div className={styles.titlebar}>
            <h1>{movie.title}</h1>
            <Rate className={styles.rate} allowHalf disabled defaultValue={Math.round(movie.score * 2) / 2}/>
            <span className={styles.meta}>{movie.score.toFixed(1)} stars</span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.poster}>
            <img className={styles.photo} src={movie['large_image_url'] || movieDefaultImg}/>
          </div>

          <div className={styles.content}>
            {movie.genre ? <Row>
              <Col span={8}>
                <div className={styles.itemname}>Genre</div>
              </Col>
              <Col span={14} offset={2}>
                <div className={styles.itemcontent}>{movie['genre']}</div>
              </Col>
            </Row> : null}
            {movie.isbn ? <Row>
              <Col span={8}>
                <div className={styles.itemname}>ISBN Code</div>
              </Col>
              <Col span={14} offset={2}>
                <div className={styles.itemcontent}>{movie['isbn']}</div>
              </Col>
            </Row> : null}
            {movie.publication_date ? <Row>
              <Col span={8}>
                <div className={styles.itemname}>Publication Date</div>
              </Col>
              <Col span={14} offset={2}>
                <div className={styles.itemcontent}>{movie['publication_date']}</div>
              </Col>
            </Row> : null}
            {movie.edition ? <Row>
              <Col span={8}>
                  <div className={styles.itemname}>Edition</div>
              </Col>
              <Col span={14} offset={2}>
                <div className={styles.itemcontent}>{movie['edition']}</div>
              </Col>
            </Row> : null}
            {movie.publisher ? <Row>
              <Col span={8}>
                <div className={styles.itemname}>Publisher</div>
              </Col>
              <Col span={14} offset={2}>
                <div className={styles.itemcontent}>{movie['publisher']}</div>
              </Col>
            </Row> : null}
            {movie.languages.length ? <Row>
              <Col span={8}>
                <div className={styles.itemname}>Languages</div>
              </Col>
              <Col span={14} offset={2}>
                <div className={styles.itemcontent}>{movie.languages.map(lang => <Tag key={lang}>{lang}</Tag>)}</div>
              </Col>
            </Row> : null}
            {movie.studio ? <Row>
              <Col span={8}>
                <div className={styles.itemname}>Studio</div>
              </Col>
              <Col span={14} offset={2}>
                <div className={styles.itemcontent}>{movie['studio']}</div>
              </Col>
            </Row> : null}
            {movie.product_type_name ? <Row>
              <Col span={8}>
                <div className={styles.itemname}>Product Type</div>
              </Col>
              <Col span={14} offset={2}>
                <div className={styles.itemcontent}>{movie['product_type_name']}</div>
              </Col>
            </Row> : null}
            {movie.product_group ? <Row>
              <Col span={8}>
                <div className={styles.itemname}>Product Group</div>
              </Col>
              <Col span={14} offset={2}>
                <div className={styles.itemcontent}>{movie['product_group']}</div>
              </Col>
            </Row> : null}
            {movie.binding ? <Row>
              <Col span={8}>
                <div className={styles.itemname}>Binding</div>
              </Col>
              <Col span={14} offset={2}>
                <div className={styles.itemcontent}>{movie['binding']}</div>
              </Col>
            </Row> : null}
            {movie.manufacturer ? <Row>
              <Col span={8}>
                <div className={styles.itemname}>Manufacturer</div>
              </Col>
              <Col span={14} offset={2}>
                <div className={styles.itemcontent}>{movie['manufacturer']}</div>
              </Col>
            </Row> : null}
            {movie.formatted_price ? <Row>
              <Col span={8}>
                <div className={styles.itemname}>DVD Price</div>
              </Col>
              <Col span={14} offset={2}>
                <div className={styles.itemcontent}>{movie['formatted_price']}</div>
              </Col>
            </Row> : null}
            {movie.sales_rank ? <Row>
              <Col span={8}>
                <div className={styles.itemname}>Sales Rank</div>
              </Col>
              <Col span={14} offset={2}>
                <div className={styles.itemcontent}>{movie['sales_rank']}</div>
              </Col>
            </Row> : null}


          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.content}>
            {movie.actors.length ? <Row>
              <Col span={4}>
                <div className={styles.itemname}>Actors</div>
              </Col>
              <Col span={18} offset={2}>
                <Row>
                  <div className={styles.itemcontent}>{movie.actors.map(item =>
                    (<Col span={8} key={item}><Link to={`/movies/1/actor/${item}`}>{item}</Link></Col>))}</div>
                </Row>
              </Col>
            </Row> : null}
            {movie.directors.length ? <Row>
              <Col span={4}>
                <div className={styles.itemname}>Directors</div>
              </Col>
              <Col span={18} offset={2}>
                <Row>
                  <div className={styles.itemcontent}>{movie.directors.map(item =>
                    (<Col span={8} key={item}><Link to={`/movies/1/director/${item}`}>{item}</Link></Col>))}</div>
                </Row>
              </Col>
            </Row> : null}
            {movie.creators.length ? <Row>
              <Col span={4}>
                <div className={styles.itemname}>Creators</div>
              </Col>
              <Col span={18} offset={2}>
                <Row gutter={40}>
                  <div className={styles.itemcontent}>{
                    movie.creators.map(item =>
                      (<Link key={item}>
                          <Col span={8}>
                            <Tag color="#2db7f5" className={styles.creator}>{item[1]}</Tag>
                            <div>{item[0]} &nbsp;</div>
                          </Col>
                        </Link>
                      ))
                  }</div>
                </Row>
              </Col>
            </Row> : null}
            {movie.authors.length ? <Row>
              <Col span={4}>
                <div className={styles.itemname}>Authors</div>
              </Col>
              <Col span={18} offset={2}>
                <Row>
                  <div className={styles.itemcontent}>{movie.authors.map(item =>
                    (<Col span={8} key={item}><Link>{item}</Link></Col>))}</div>
                </Row>
              </Col>
            </Row> : null}
          </div>
        </div>

        {movie.editorial_review ?
        <div className={styles.comments}>
          <p className={styles.commentsHeader}>
            Editorial Review
          </p>
          <div className={styles.commentChildren} dangerouslySetInnerHTML={{
            __html: movie.editorial_review
          }}>
          </div>
        </div>
          : null}

        <CommentList
          comments={comments} commentPage={commentPage} dispatch={dispatch}
          commentTotalSize={commentTotalSize} movie={movie.productId} user={null} />
      </div>
    </Layout>
  );
}

ItemPage.propTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.global,
    ...movieSelector(state, ownProps),
  };
}

export default connect(mapStateToProps)(ItemPage);
