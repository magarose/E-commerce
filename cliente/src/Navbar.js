import React, { Component } from 'react';
import adaIcon from './assets/Ada_Iso_Blanco.png';
import search from './assets/Icono_Search.png';
import { Link } from 'react-router-dom';
import './styles/navbar.css'

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textValue: '',
        }

        this.handleInputOnChange = this.handleInputOnChange.bind(this)
    }
    handleInputOnChange(e) {
        this.setState({
            textValue: e.target.value
        })
    }



    render() {
        const url = "/items?search=" + this.state.textValue
        return (

            <nav>
                <div className='Logo'>
                    <img src={adaIcon} />
                </div>
                <div className="form">
                    <input type='text' placeholder='Nunca dejes de buscar' value={this.state.textValue} onChange={this.handleInputOnChange}>
                    </input><button>
                        <Link to={url}><img src={search}/></Link>
                    </button>
                </div>

            </nav>
        )
    }
}

export default Navbar; 