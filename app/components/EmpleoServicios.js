import React from 'react';
import ServiciosDate from './ServiciosDate';
import CustomLabel from './CustomLabel';
import { LineChart, Line, Label, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

export default class EmpleoServicios extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        fetch('https://indicadores.pr/api/action/datastore_search_sql?sql=SELECT a."Month",a."Professional, Scientific, and Technical Services NSA" from "1ec5d298-d1c4-4815-bec4-c5045845228f" a WHERE a."Month" >= \'1990-01-01\' ORDER BY a."Month" asc')
            .then(result => {
                return result.json();
            }).then(data => {
                //console.log(data.result.records);
                this.setState({ data: data.result.records });
            })
    }

    dateFormatter(date) { return date.substring(0, 7) };

    render() {
        let chart = (
            <LineChart
                data={this.state.data}
                width={600} height={400}
                margin={{ top: 5, right: 10, left: -10, bottom: 10 }} >
                <XAxis dataKey="Month" padding={{ left: 10, right: 10 }} 
                    height={50} interval={23}
                    tick={<ServiciosDate dy={15} _x={-10} _y={0} textAnchor={"middle"} />}
                />
                <YAxis type="number" domain={[0, 40]}
                    ticks={[0,5,10,15,20,25,30,35,40]}
                    tick={<CustomLabel dy={10} _x={-5} _y={-5} textAnchor={"end"} />} >
                    <Label dy={10} dx={60} value="Miles de empleos" position="insideTopLeft" />
                </YAxis>
                <CartesianGrid strokeDasharray="3 3" />
                <Legend iconType={'line'} verticalAlign={'bottom'} />
                <Tooltip labelFormatter={this.dateFormatter}
                    formatter={(value) => value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                />
                <Line type="linear" dataKey="Professional, Scientific, and Technical Services NSA" stroke="#340d9f" strokeWidth={2} />
                
            </LineChart>
        )
        return (
            <ResponsiveContainer>
                {chart}
            </ResponsiveContainer>
        );
    }
}


