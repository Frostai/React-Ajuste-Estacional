import React from 'react';

export default class ServiciosDate extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <g transform={`translate(${this.props.x},${this.props.y})`}>
                <text x={this.props._x} y={this.props._y} dy={this.props.dy}
                    transform={'rotate(-35)'}
                    textAnchor={this.props.textAnchor}
                    fontSize={14}
                    fill="#666">
                    {this.props.payload.value.substring(0,7)}
                </text>
            </g>
        )
    }
}