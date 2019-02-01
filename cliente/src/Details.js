import React, { Component } from 'react';
import Navbar from './Navbar';
import truck from './assets/Icono_Envio.png'
// import { Link } from 'react-router-dom';

class Details extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: []
        }
    }
    componentDidMount() {
        fetch('http://localhost:3001/api/items/' + this.props.match.params.id)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    product: data.item
                })
            })
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className='datos'>
                    <p>{this.state.product.condition === "new" ? "Nuevo" : "Usado"} | <span>{this.state.product.sold_quantity} vendidos</span></p>
                    <div class = 'free'>
                    {this.state.product.free_shipping && <img src={truck}></img>} 
                  </div>
                    <h2>$ </h2>
                    <button>Comprar </button>
                </div>
                <div className='descripcion'>
                    <img alt='' src={this.state.product.picture}></img>
                    <h3>Descripcion del producto</h3>
                    <p> {this.state.product.description} </p>
                </div>
                </div>
        );
    }
}
export default Details;