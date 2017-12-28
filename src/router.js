import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link, Redirect } from 'dva/router';
import ListPage from './routes/ListPage';
import ItemPage from './routes/ItemPage';
import SearchPage from './routes/SearchPage';
import UserPage from './routes/UserPage';
import SimpleListPage from './routes/SimpleListPage';

export default function ({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={SearchPage} />
      <Route path="/movies/:page/*" component={ListPage} />
      <Redirect from="/movies/:page" to="/" />
      <Route path="/movie/:movieId" component={ItemPage} />
      <Route path="/user/:user/:page" component={UserPage} />
      <Route path="/title/:title/:page" component={SimpleListPage} />
      <Route path="/actor/:actor/:page" component={SimpleListPage} />
      <Route path="/director/:director/:page" component={SimpleListPage} />
      <Route path="/com/:director/:actor/:page" component={ListPage} />
    </Router>
  );
}
