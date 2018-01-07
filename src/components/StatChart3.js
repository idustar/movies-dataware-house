import React from 'react';
import {Chart, Axis, Geom, Tooltip, Coord} from 'bizcharts';
import DataSet from '@antv/data-set';
import {hashHistory} from 'react-router';


class StatChart extends React.Component {
  render() {
    if (!this.props.data) return null;
    let data = this.props.data.filter((e) => e[0] > 1990 & e[0] < 2018)
      .map((e) => {
        return {date: e[0] * 12 + e[1] - 1, month: e[0] + '/' + e[1], movies: e[2]}
      });
    const cols = {
      date: {},
      movies: {}
    }
    // const ds = new DataSet();
    // const dv = ds.createView().source(data);
    function goto(ev) {
      let year = parseInt(ev.data._origin.date / 12, 10);
      let month = ev.data._origin.date - year * 12 + 1;
      hashHistory.push(`movies/1/date/${year}-${month}-1/${month===12?year+1:year}-${(month === 12) ? 1 : month + 1}-1`);
    }

    return (
      <div>
        <Chart height={400} data={data} scale={cols} onIntervalClick={(ev) => goto(ev)}
               forceFit padding={[0, 60, 30, 0]}>
          <Coord type="helix" startAngle={0.5 * Math.PI} endAngle={12.5 * Math.PI}/>
          <Axis name="date" line={null}/>
          <Tooltip showTitle={false}/>
          <Geom type='interval' position='date*movies' tooltip='month*movies'
                color={['movies', '#ffffff-#1890FF']} size={0.38}/>
        </Chart>
      </div>
    );
  }

}


export default StatChart;
