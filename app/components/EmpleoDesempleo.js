import React from 'react';
import CustomDate from './CustomDate';
import CustomLabel from './CustomLabel';


import { LineChart, Line, Label, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

export default class EmpleoDesempleo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        fetch('https://indicadores.pr/api/action/datastore_search?resource_id=3782a13d-96dd-4cab-adb2-5ace776c6f8a&limit=300&offset=300&sort=_id desc&fields=Month,Puerto Rico SA,Puerto Rico NSA')
            .then(result => {
                return result.json();
            }).then(data => {
                //console.log(data.result.records);
                this.setState({ data: data.result.records });
            })
    }

    dateFormatter(date) { return date.substring(0,7)};   

    render() {
        let chart = (
            <LineChart
                data={this.state.data}
                width={600} height={400}
                margin={{ top: 5, right: 10, left: -20, bottom: 5 }} >
                <XAxis dataKey="Month" padding={{ left: 10, right: 10 }}
                    tick={<CustomDate dy={10} _y={10} textAnchor={"middle"} />}
                />
                <YAxis type="number" domain={[6, 20]}
                    ticks={[6,8,10,12,14,16,18,20]}
                    tick={<CustomLabel dy={10} _x={-5} _y={-5} textAnchor={"end"} />} >
                    <Label dy={10} dx={60} value="Por ciento" position="insideTopLeft" />
                </YAxis>
                <CartesianGrid strokeDasharray="3 3" />
                <Legend iconType={'line'}/>
                <Tooltip labelFormatter={this.dateFormatter}
                    formatter={(value) => value + '%'}
                />
                <Line type="linear" name="Desestacionalizado" dataKey="Puerto Rico SA" stroke="#340d9f" strokeWidth={2} />
                <Line type="linear" name="Con estacionalidad" dataKey="Puerto Rico NSA" stroke="#9bc337" strokeWidth={2} />
            </LineChart>
        )
        return (
            <ResponsiveContainer>
                {chart}
            </ResponsiveContainer>
        );
    }
}


