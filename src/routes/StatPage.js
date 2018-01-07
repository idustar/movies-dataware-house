import React from 'react';
import {connect} from 'dva';
import {Select, Radio, Checkbox} from 'antd';

const CheckboxGroup = Checkbox.Group;
import styles from './StatPage.less';
import Layout from '../components/Layout';
import {statSelector} from '../models/stat/selectors';
import StatChart from '../components/StatChart';
import StatChart1 from '../components/StatChart1';


class StatPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'year',
      cType: 'intervalStack',
      month: {
        checkedList: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        options: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        indeterminate: false,
        checkAll: true,
      },
      week: {
        checkedList: ['Mon', 'Tue', 'Wes', 'Thu', 'Fri', 'Sat', 'Sun'],
        options: ['Mon', 'Tue', 'Wes', 'Thu', 'Fri', 'Sat', 'Sun'],
        indeterminate: false,
        checkAll: true,
      },
      season: {
        checkedList: ['Spring', 'Summer', 'Autumn', 'Winter'],
        options: ['Spring', 'Summer', 'Autumn', 'Winter'],
        indeterminate: false,
        checkAll: true,
      }
    };
  }

  componentDidMount() {
    this.fetchStat();
  }

  handleSizeChange = (e) => {
    this.setState({type: e.target.value});
    this.fetchStat(e.target.value);
  };
  handleCTypeChange = (e) => {
    this.setState({cType: e.target.value});
  };
  fetchStat = (type = this.state.type) => {
    this.props.dispatch({
      type: 'stat/fetchData',
      payload: type,
    });
  };
  onChange = (checkedList) => {
    console.log(checkedList)
    this.setState({
      [this.props.curType]: {
        ...this.state[this.props.curType],
        checkedList,
        indeterminate: !!checkedList.length &&
        (checkedList.length < this.state[this.state.type].options.length),
        checkAll: checkedList.length === this.state[this.props.curType].options.length,
      }
    });
  }
  onCheckAllChange = (e) => {
    this.setState({
      [this.props.curType]: {
        ...this.state[this.props.curType],
        checkedList: e.target.checked ? this.state[this.props.curType].options : [],
        indeterminate: false,
        checkAll: e.target.checked,
      }
    });
  }

  render() {
    let chart = null;
    let form = null;

    switch (this.props.curType) {
      case 'year':
        form = null;
        chart = (<StatChart type={this.state.type} cha={this.state.cType} data={this.props.data.map(e => {
          return {date: e[0], str: e[0], movies: e[1]}
        })}/>);
        break;
      case 'month':
        let years = {}
        let arrTo = {
          Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8,
          Sep: 9, Oct: 10, Nov: 11, Dec: 12
        }
        this.state.month.checkedList.forEach(e => {
          let number = this.props.data.filter(ee => ee[1] === arrTo[e]);
          number.forEach(ee => {
            years[ee[0]] = {...years[ee[0]], [e]: ee[2]};
          });
        })
        let data = [];
        Object.keys(years).forEach(e => {
          data.push({date: Number(e), ...years[e]});
        })

        form = (
          <div>
            <div style={{borderBottom: '1px solid #E9E9E9'}}>
              <Checkbox
                indeterminate={this.state.month.indeterminate}
                onChange={this.onCheckAllChange}
                checked={this.state.month.checkAll}
              >
                Check all
              </Checkbox>
            </div>
            <CheckboxGroup options={this.state.month.options} value={this.state.month.checkedList}
                           onChange={this.onChange}/>
          </div>
        );
        chart = (<StatChart1
          type={this.state.type} data={data} keys={this.state.month.checkedList} cha={this.state.cType}/>);
        break;
      case 'season':
        years = {};
        arrTo = ['Spring', 'Spring', 'Spring', 'Spring', 'Summer', 'Summer', 'Summer',
          'Autumn', 'Autumn', 'Autumn', 'Winter', 'Winter', 'Winter']
        this.state.season.checkedList.forEach(e => {
          let number = this.props.data.filter(ee => arrTo[ee[1]] === e);
          number.forEach(ee => {
            let add;
            if (ee[0] in years && e in years[ee[0]]) {
              add = ee[2] + years[ee[0]][e];
            } else {
              add = ee[2];
            }
            years[ee[0]] = {...years[ee[0]], [e]: add};
          });
        })
        data = [];
        Object.keys(years).forEach(e => {
          data.push({date: Number(e), ...years[e]});
        })

        form = (
          <div>
            <div style={{borderBottom: '1px solid #E9E9E9'}}>
              <Checkbox
                indeterminate={this.state.season.indeterminate}
                onChange={this.onCheckAllChange}
                checked={this.state.season.checkAll}
              >
                Check all
              </Checkbox>
            </div>
            <CheckboxGroup options={this.state.season.options} value={this.state.season.checkedList}
                           onChange={this.onChange}/>
          </div>
        );
        chart = (<StatChart1
          type={this.state.type} data={data} keys={this.state.season.checkedList} cha={this.state.cType}/>);
        break;
      case 'week':
        years = {};
        arrTo = {
          Mon: 0,
          Tue: 1,
          Wes: 2,
          Thu: 3,
          Fri: 4,
          Sat: 5,
          Sun: 6
        }
        this.state.week.checkedList.forEach(e => {
          let number = this.props.data.filter(ee => ee[1] === arrTo[e]);
          number.forEach(ee => {
            years[ee[0]] = {...years[ee[0]], [e]: ee[2]};
          });
        })
        data = [];
        Object.keys(years).forEach(e => {
          data.push({date: Number(e), ...years[e]});
        })

        form = (
          <div>
            <div style={{borderBottom: '1px solid #E9E9E9'}}>
              <Checkbox
                indeterminate={this.state.week.indeterminate}
                onChange={this.onCheckAllChange}
                checked={this.state.week.checkAll}
              >
                Check all
              </Checkbox>
            </div>
            <CheckboxGroup options={this.state.week.options} value={this.state.week.checkedList}
                           onChange={this.onChange}/>
          </div>
        );
        chart = (<StatChart1
          type={this.state.type} data={data} keys={this.state.week.checkedList} cha={this.state.cType}/>);
        break;
      default:
        break;
    }
    return (
      <Layout loading={this.props.loading}>
        <div className={styles.normal}>
          <div className={styles.header}>
            <div className={styles.titlebar}>
              <h1>Statistics By Time</h1>
            </div>
          </div>


          <div className={styles.card}>
            <h2>Type Select</h2>
            <Radio.Group value={this.state.type} onChange={this.handleSizeChange}>
              <Radio.Button value="year">by year</Radio.Button>
              <Radio.Button value="season">by season</Radio.Button>
              <Radio.Button value="month">by month</Radio.Button>
              <Radio.Button value="week">by week in a year</Radio.Button>
            </Radio.Group>
            {form}
          </div>
        </div>

        <div className={styles.card}>
          <Radio.Group value={this.state.cType} onChange={this.handleCTypeChange}>
            <Radio.Button value="line">LINE</Radio.Button>
            <Radio.Button value="intervalStack">HISTOGRAM</Radio.Button>
            <Radio.Button value="point">POINT</Radio.Button>
            <Radio.Button value="area">AREA</Radio.Button>
          </Radio.Group>
          {chart}

        </div>


      </Layout>
    );
  }
}

StatPage.propTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.global,
    ...statSelector(state, ownProps),
  };
}

export default connect(mapStateToProps)(StatPage);
