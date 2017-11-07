import React from 'react';

export default class CustomLabel extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.payload);
    }
    render() {
        return (
            <g transform={`translate(${this.props.x},${this.props.y})`}>
                <text x={this.props._x} y={this.props._y} dy={this.props.dy}
                    textAnchor={this.props.textAnchor}
                    fontSize={14}
                    fill="#666">
                    {(this.props.payload.value/1000000).toLocaleString()}
                </text>
            </g>
        )
    }
}