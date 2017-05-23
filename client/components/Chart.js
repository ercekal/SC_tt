/*jshint esversion: 6 */
import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const SimpleLineChart = (props) => {

  return (
    <LineChart width={600} height={300} data={props.data}
    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
      <XAxis dataKey="yyyy"/>
      <YAxis/>
      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip/>
      <Legend />
      <Line type="monotone" dataKey="rain_mm" stroke="#8884d8" activeDot={{r: 8}}/>
      <Line type="monotone" dataKey="sunshine_hours" stroke="#82ca9d" />
      <Line type="monotone" dataKey="tmax_C" stroke="#43ca9d" />
      <Line type="monotone" dataKey="tmin_C" stroke="#35ca9d" />
    </LineChart>
  )
}

export default SimpleLineChart
