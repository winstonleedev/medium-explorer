import { Component } from 'react';
import { Line } from 'react-chartjs-2';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.chartJSData = props.chartJSData;
    }
    render() {
        return (
            <Line
            data={this.chartJSData}
            options={{
                scales: { yAxes: [{ticks: { min: 5, max: 20 }}]}
            }}
            />
        );

    }
  }

  export default Chart;
