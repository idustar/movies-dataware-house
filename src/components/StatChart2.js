import React from 'react';
import {Chart, Axis, Geom, Tooltip, Coord, Legend} from 'bizcharts';
import DataSet from '@antv/data-set';

class StatChart extends React.Component {
  render() {
    const data = [
      { label: 'MySQL', series1: 2800, series2: 2260 },
      { label: 'Hive', series1: 1800, series2: 1300 },
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: [ 'series1', 'series2' ], // 展开字段集
      key: 'type', // key字段
      value: 'value', // value字段
    });

    return (
      <div>
        <Chart height={200} data={dv} forceFit>
          <Coord transpose scale={[1,-1]}/>
          <Axis name="label" label={{offset: 15}} />
          <Axis name="value" position={'right'} />
          <Tooltip />
          <Legend name="type" position='bottom' />
          <Geom type="intervalStack" position="label*value" color={'type'}/>
        </Chart>
      </div>
    );
  }

}


export default StatChart;
