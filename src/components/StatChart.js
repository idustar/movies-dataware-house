import React from 'react';
import {Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape} from 'bizcharts';
import Slider from 'bizcharts-plugin-slider';
import DataSet from '@antv/data-set';

class StatChart extends React.Component {

  render() {
    const {type, data, cha} = this.props;
    if (!(data.length)) return <p>loading...</p>;
    const ds = new DataSet({state: { start: 1990, end: 2015, }});
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'filter',
      callback: (obj) => {
        const date = obj.date;
        return date <= ds.state.end && date >= ds.state.start;
      }
    })
    const cols = {
      date: {
        nice: false
      },
      movies: {}
    }
    const onChange = (obj) => {
      const {startText, endText} = obj;
      ds.setState('start', startText);
      ds.setState('end', endText);
    }

    return (
      <div>
        <Chart height={500} data={dv} cols={cols} forceFit>
          <Axis name="date"/>
          <Axis name="movies"/>
          <Tooltip showTitle={false} itemTpl='<li data-index={index}><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}{value}</li>' />
          <Geom type={cha}
                position='date*movies'
                tooltip={['str*movies', (str, movies) => {
                  return {
                    name: str,
                    value: '<br><span style="padding-left: 16px">Movies：' + movies + '</span><br/>'
                  };
                }]}
          />
        </Chart>
        <div>
          <Slider padding={[ 20, 40, 20, 40 ]} width='auto' height={26} start={ds.state.start} end={ds.state.end}
                  xAxis="date" yAxis='movies' scales={{date:{nice: false, type: 'linear', tickInterval: 10, formatter: e=>parseInt(e, 10)}, movies: {}}} data={data}
                  onChange={onChange}
          />
        </div>
      </div>
    );
  }

}


export default StatChart;
