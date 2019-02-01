import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

class Details extends Component {
    constructor(props) {
        super(props);

        this.state = {
                productId: []
        }
    }
    componentDidMount() {
        fetch('http://localhost:3001/api/items/' + this.props.match.params.id)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                 productId: data.item
                })
            })
    }

    render() {
            

        return (
            <div>
                    <img src={this.state.productId.picture}></img>
            </div>
        );
    }
}
export default Details;