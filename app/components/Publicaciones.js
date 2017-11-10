import React from 'react';
import { LineChart, Line, Label, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

export default class VentasDetal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };

    }

    componentDidMount() {
        fetch('https://datos.estadisticas.pr/api/action/datastore_search?resource_id=1ac0b44d-ae18-4677-b4f9-3e1fef74a2d8&sort=_id desc&limit=500')
            .then(result => {
                return result.json();
            }).then(data => {
                //console.log(data.result.records);
                this.setState({ data: data.result.records });
            })
    }

    render() {
        let chart = (
            <LineChart
                data={this.state.data}
                width={600} height={400}
                margin={{ top: 5, right: 30, left: -20, bottom: 5 }} >
                <XAxis dataKey="Year" type="category" padding={{ left: 5, right: 0 }}
                    domain={['auto', 'auto']}
                    interval={'preserveEnd'} />}
                />
                <YAxis type="number"
                    label={{ value: "Publicaciones", position: "insideTopLeft", dx: 60, dy: 10 }}
                />

                <CartesianGrid strokeDasharray="3 3" />
                <Legend iconType={'line'} />
                <Tooltip
                    formatter={(value) => value.toLocaleString()}
                />
                <Line type="linear" name="Publicaciones" dataKey="Publicaciones" stroke="#340d9f" strokeWidth={2} />
            </LineChart>

        )
        return (
            <ResponsiveContainer>
                {chart}
            </ResponsiveContainer>
        );
    }
}


