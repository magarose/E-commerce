import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import truck from './assets/Icono_Envio.png'
import './styles/products.css'

class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            items: []
        }
    }
    componentDidMount() {
        const urlParams = new URLSearchParams(window.location.search);
        const busqueda = urlParams.get('search');
        fetch('http://localhost:3001/api/items?search=' + busqueda)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    items: data.items,
                    categories: data.categories
                })
            })
    }



    render() {
        const categories = this.state.categories.map((p) =>
                <div className = 'breadcrumb'>{p}  > </div>
    
        )

        const productos = this.state.items.map((l) =>
            <div className='productos'>
                <div className='pic'>
                    <img alt='' src={l.thumbnail} />
                </div>
                <div className='data'>
                    <p className='price'>$ {l.price.amount}, {l.price.decimals}
                        <span className='free'>{l.free_shipping && <img alt='' src={truck}></img>}</span></p>
                    <p className='title'>{l.title}</p>
                </div>
                <div className='detail'>
                    <p> {l.location} </p>
                    <Link to={'/items/' + l.id}><button>Ver detalle</button></Link>
                </div>
            </div >)
        return (
            <div>
                <Navbar />
                {categories}
                <div class='list'>
                    {productos}
                </div>

            </div>
        );
    }

}

export default Products;