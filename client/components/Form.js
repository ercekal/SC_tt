/*jshint esversion: 6 */
import React, {Component} from 'react';
import {FormGroup, FormControl, Checkbox, Button} from 'react-bootstrap';
import myData from '../heathrow-weatherstation.json';
import Chart from './Chart.js';

export default class Form extends Component {

  constructor() {
    super();
    this.state = {
      fromYear: 1958,
      toYear: 2014,
      rain: false,
      sunshine: false,
      airfrost: false,
      maxTemp: false,
      minTemp: false,
      filteredData: [],
      error: ""
    };
  }

  componentWillMount() {
    for(var i = 0; i < myData.length; i++){
      var obj = myData[i];
      for(var prop in obj){
        if(obj.hasOwnProperty(prop) && !isNaN(obj[prop])){
          obj[prop] = +obj[prop];
        }
      }
    }
  }

  _checkYears(from, to){
    if (to < from) {
      this.setState({
        toYear: parseInt(from) + 1,
        error: "Comparison year can't be earlier than the start year"
      }, () => {
        console.log(this.state);
      })
    } else {
      this.setState({
        error: ""
      })
    }
  }

  _onFromYearChange(e) {
    this.setState({
      fromYear: e.target.value
    }, () => {
      this._checkYears(this.state.fromYear, this.state.toYear)
    });
  }

  _onToYearChange(e) {
    this.setState({
      toYear: e.target.value
    }, () => {
      this._checkYears(this.state.fromYear, this.state.toYear)
    });
  }

  _onMaxTempChange(e) {
    this.setState({
      maxTemp: !this.state.maxTemp
    });
  }

  _onMinTempChange(e) {
    this.setState({
      minTemp: !this.state.minTemp
    });
  }

  _onRainChange(e) {
    this.setState({
      rain: !this.state.rain
    });
  }

  _onSunshineChange(e) {
    this.setState({
      sunshine: !this.state.sunshine
    }, () => {console.log(this.state);})
  }

  _onAirfrostChange(e) {
    this.setState({
      airfrost: !this.state.airfrost
    });
  }

  _removeMaxC(data) {
    if(this.state.maxTemp === false) {
      delete data['tmax_C']
    }
  }

  _removeMinC(data) {
    if(this.state.minTemp === false) {
      delete data['tmin_C']
    }
  }

  _removeSunshine(data) {
    if(this.state.sunshine === false) {
      delete data['sunshine_hours']
    }
  }

  _removeAirfrost(data) {
    if(this.state.airfrost === false) {
      delete data['air_frost']
    }
  }

  _removeRain(data) {
    if(this.state.rain === false) {
      delete data['rain_mm']
    }
  }
  _checkSelectedFields(data) {
    this._removeRain(data)
    this._removeSunshine(data)
    this._removeMinC(data)
    this._removeMaxC(data)
    this._removeAirfrost(data)
  }

  _onButtonClick(fromYear, toYear) {
    if (Object.values(this.state).includes(true)) {
      const newData = [];
      myData.map((x) => {
        if (x.yyyy >= toYear && x.yyyy <= fromYear) {
          this._checkSelectedFields(x)
          return newData.push(x);
        }
      });
      this.setState({
        filteredData: newData,
        error: ""
      }, () => {})
    } else {
      this.setState({
        error: "Please select at least one stats"
      })
    }
  }

  render() {

    let years = [];
    for (var i = 1958; i < 2015; i++) {
      years.push(<option value={i} key={i}>{i}</option>);
    }

    return (
      <div className="row">
        <div>
          <Chart data={this.state.filteredData}/>
        </div>
        <div>
          <FormGroup controlId="formControlsSelect" onChange={this._onFromYearChange.bind(this)}>
            <FormControl componentClass="select" value={this.state.fromYear} placeholder="select">
              {years}
            </FormControl>
          </FormGroup>
          <FormGroup controlId="formControlsSelect" onChange={this._onToYearChange.bind(this)}>
            <FormControl componentClass="select" value={this.state.toYear} placeholder="select">
              {years}
            </FormControl>
          </FormGroup>
          <Checkbox onChange={this._onMaxTempChange.bind(this)}>
            temp max C
          </Checkbox>
          <Checkbox onChange={this._onMinTempChange.bind(this)}>
            temp min C
          </Checkbox>
          <Checkbox onChange={this._onRainChange.bind(this)}>
            rain mm
          </Checkbox>
          <Checkbox onChange={this._onSunshineChange.bind(this)}>
            sunshine hours
          </Checkbox>
          <Checkbox onChange={this._onAirfrostChange.bind(this)}>
            air frost
          </Checkbox>
          <Button onClick={() => this._onButtonClick(this.state.toYear, this.state.fromYear)}>
            Display
          </Button>
        </div>
      </div>
    )
  }
}
