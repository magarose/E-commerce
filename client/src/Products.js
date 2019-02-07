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
            items: [],
            isLoading: true
        }

        this.previousSearch = null;
    }

    getQueryParams() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("search");
    }
    productsList() {
        const search = this.getQueryParams()
        fetch('http://localhost:3001/api/items?search=' + search)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    items: data.items,
                    categories: data.categories,
                    isLoading: false
                })
            })
    }
    componentDidUpdate() {
        // call the api if the search is different to the previous search
        if (this.previousSearch !== this.getQueryParams()) {
            this.productsList();
        }
    }

    componentDidMount() {
        //get the api
        this.productsList();
    }




    render() {
        if (this.state.isLoading) {
            return (
                <h1 className='loading'>Cargando...</h1>

            )
        }
        const categories = this.state.categories.map((p) =>
            <p>{p}<span> > </span></p>

        )

        const productos = this.state.items.map((l) =>
            <div className='productos'>
            
                <div className='pic'>
                    <img alt='' src={l.thumbnail} />
                </div>

                <div className='data'>
                    <p className='price'>$ {l.price.amount} {(l.price.decimals === 0) && <sup> 00</sup>}
                        {(l.price.decimals !== 0) && <sup>{l.price.decimals} </sup>}
                        <span>{l.free_shipping && <img alt='' src={truck}></img>} </span>
                        </p>
                        <p>{l.title}</p>
                </div>

                <div className='detail'>
                    <p> {l.location} </p>
                    <Link to={'/items/' + l.id}><button>Ver detalle</button></Link>
                </div>

            </div >)
        return (
            <div className='products'>
                <Navbar />
                <div className='breadcrumb'>{categories}</div>
                <div class='list'>
                    {productos}
                </div>

            </div>
        );
    }

}

export default Products;