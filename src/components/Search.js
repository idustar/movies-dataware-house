import React from 'react';
import {Form, Icon, Input, Button, Checkbox, DatePicker, Switch} from 'antd';
import {Link} from 'dva/router';
import {connect} from 'dva/index';
import {searchSelector} from '../models/search/selectors';
import styles from './Search.less';

const Searchs = Input.Search;
const RangePicker = DatePicker.RangePicker;


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.search = this.search.bind(this);
    this.handleLikeChange = this.handleLikeChange.bind(this);
  }

  toggle = () => {
    this.setState({
      open: !this.state.open,
    });
  }

  search() {
    this.props.dispatch({
      type: 'search/search',
      payload: {},
    })
  }

  handleChange(event) {
    this.props.dispatch({
      type: 'search/changeFormValue',
      payload: {
        key: event.target.dataset.for,
        value: event.target.value,
      }
    })
  }

  handleDateChange(dates, dateStrings) {
    this.props.dispatch({
      type: 'search/changeFormValue',
      payload: {
        key: 'dates',
        value: dates,
      }
    })
    this.props.dispatch({
      type: 'search/changeFormValue',
      payload: {
        key: 'dateStr',
        value: dateStrings,
      }
    })
  }

  handleLikeChange(e) {
    this.props.dispatch({
      type: 'search/changeFormValue',
      payload: {
        key: 'like',
        value: e.target.checked,
      }
    })
  }

  render() {
    const {simple, form} = this.props;

    return (
      <div>

        <Searchs size="large" placeholder="MOVIE TITLE" data-for="title"
                 onSearch={this.search}
                 defaultValue={form.title}
                 enterButton onChange={this.handleChange}/>
        <div className={styles.infobar}>
          {simple?null:<div className={styles.switch}>
            <Switch defaultChecked={this.state.open}
                  onChange={this.toggle}/><span>&nbsp;&nbsp;&nbsp;SHOW MORE OPTIONS&nbsp;&nbsp;&nbsp;</span>
          </div>}
          <Checkbox defaultChecked={form.like} onChange={this.handleLikeChange}>Phrase Query(only movie title is available)</Checkbox>
        </div>
        <div className={styles.select}>

          {this.state.open ? (<div>
            <div>
              <Input addonBefore="Actor" data-for="actor"
                     placeholder="ACTOR NAME" defaultValue={this.props.form.actor} onChange={this.handleChange}/>
            </div>
            <div>
              <Input addonBefore="Director" data-for="director"
                     defaultValue={this.props.form.director} placeholder="DIRECTOR NAME"
                     onChange={this.handleChange}/>
            </div>
            <div>
              <Input addonBefore="Genre" data-for="genre"
                     defaultValue={this.props.form.genre} placeholder="GENRE" onChange={this.handleChange}/>
            </div>
            <RangePicker format={'YYYY-MM-DD'} allowClear data-for="dates"
                         defaultValue={this.props.form.dates} onChange={this.handleDateChange}/>
          </div>) : null}
        </div>


      </div>
    );
  }
}

Search.propTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    ...searchSelector(state, ownProps),
  };
}

export default connect(mapStateToProps)(Search);


