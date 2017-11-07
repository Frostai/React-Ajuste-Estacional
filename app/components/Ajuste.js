import React from 'react';
import Patentes from './Patentes';
import Ventas from './VentasDetal';
import EmpleoDesempleo from './EmpleoDesempleo';
import EmpleoAsalariado from './EmpleoAsalariado';

export default class Ajuste extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
            <Patentes/>
            <Ventas/>
            <EmpleoDesempleo />
            <EmpleoAsalariado />
            </div>
        );
    }
}