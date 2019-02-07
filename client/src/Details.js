import React, { Component } from 'react';
import Navbar from './Navbar';
import truck from './assets/Icono_Envio.png'
import './styles/details.css'
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';

class Details extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: [],
            categories: [],
            isLoading: true
        }

    }
    componentDidMount() {
        fetch('http://localhost:3001/api/items/' + this.props.match.params.id)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    product: data.item,
                    categories: data.categories,
                    isLoading: false
                })
            })
    }

    render() {
        if (this.state.isLoading) {
            return <h1>Cargando...</h1>
        }
        const breadcrumb = this.state.categories.map((p) =>
            <p>{p.name} <span> > </span> </p>
        )
        return (
            <div className='details'>
                <Navbar />
                <div className='breadcrumb'>
                    {breadcrumb}
                </div>
                <div className='datos'>
                    <div className='description'>
                        <img alt='' src={this.state.product.picture}></img>
                        <h3>Descripcion del producto</h3>
                        <p> {this.state.product.description} </p>
                    </div>
                    <div className='comprar'>
                        <div className='new'>
                            <p>{this.state.product.condition === "new" ? "Nuevo" : "Usado"}   - <span>{this.state.product.sold_quantity} vendidos </span>
                                <span className='free'>
                                    {this.state.product.free_shipping && <img alt='' src={truck}></img>}
                                </span>
                            </p>
                        </div>
                        <div className = 'price'>
                        <h2>$ {this.state.product.price.amount}
                            {(this.state.product.price.decimals === 0) && <sup> 00</sup>}
                            {(this.state.product.price.decimals !== 0) && <sup>{this.state.product.price.decimals}</sup>}
                        </h2>
                        </div>
                        <div className='btn'>
                            <Link to={'/'}><button>Comprar</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Details;