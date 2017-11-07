import React from 'react';
import YAxisVentasDetal from './YAxisVentasDetal';
import CustomDate from './CustomDate';

import { LineChart, Line, Label, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

export default class VentasDetal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.dateFormatter = this.dateFormatter.bind(this);
    }

    componentDidMount() {
        fetch('https://indicadores.pr/api/action/datastore_search?resource_id=ed7a7aa1-1978-4d16-be1e-e83a63d9a890&limit=500&sort=_id desc&fields=Date,VD.NSA,VD.SA')
            .then(result => {
                return result.json();
            }).then(data => {
                console.log(data.result.records);
                this.setState({ data: data.result.records });
            })
    }

    dateFormatter(date) { return date.substring(0,7)};

    render() {
        let chart = (
            <LineChart
                data={this.state.data}
                width={600} height={400}
                margin={{ top: 5, right: 30, left: 35, bottom: 5 }} >
                <XAxis dataKey="Date" type="category" padding={{ left: 10, right: 10 }}
                    domain={['2005-01-01', 'dataMax']}
                    interval={11}
                    tick={<CustomDate dy={10} _y={10} textAnchor={"middle"} />}
                />
                <YAxis type="number"
                    label={{ value: "millones de dólares", position: "insideTopLeft", dx: 60, dy: 10}}
                    domain={[2000000000, 4000000000]}
                    ticks={[2000000000,2250000000,2500000000,2750000000,3000000000,3250000000,3500000000,3750000000,4000000000]}
                    tick={<YAxisVentasDetal dy={10} _x={-5} _y={-5} textAnchor={"end"} />} />

                <CartesianGrid strokeDasharray="3 3" />
                <Legend iconType={'line'} />
                <Tooltip labelFormatter={this.dateFormatter}
                    formatter={(value) => value.toLocaleString()}
                />
                <Line type="linear" name="Desestacionalizado" dataKey="VD.SA" stroke="#340d9f" strokeWidth={2} />
                <Line type="linear" name="Con estacionalidad" dataKey="VD.NSA" stroke="#9bc337" strokeWidth={2} />
            </LineChart>

        )
        return (
            <ResponsiveContainer>
                {chart}
            </ResponsiveContainer>
        );
    }
}


