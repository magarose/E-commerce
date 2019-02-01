import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

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
    
        const productos = this.state.items.map((l) =>
            <div>
                <div>
                    <img src={l.thumbnail} />
                </div>
                <p>$ {l.price.amount}, <span> {l.price.decimals}</span></p>
                <p>{l.title}</p>
                <p> {l.location}</p>
                <Link to={'/items/' + l.id}><button>Ver detalle</button></Link> 
        
        </div>)
        return (
            <div>
                <Navbar></Navbar>
                <ul className="items">
                    {productos}
                </ul>
            </div>
        );
    }

}

export default Products;