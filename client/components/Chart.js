/*jshint esversion: 6 */
import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const SimpleLineChart = (props) => {

  if(props.data.length == 0) {
    return (
      <div style={{width: 500, height: 280, backgroundColor: 'gray', align: 'center'}}>
        Please select the fields that you want to see and press display
      </div>
    )
  } else {
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
        <Line type="monotone" dataKey="tmax_C" stroke="red" />
        <Line type="monotone" dataKey="tmin_C" stroke="black" />
        <Line type="monotone" dataKey="air_frost" stroke="yellow" />
      </LineChart>
    )
  }
}

export default SimpleLineChart
