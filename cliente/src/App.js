import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import Products from './Products';
import Details from './Details';
import Navbar from './Navbar';

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <BrowserRouter>
      <div>
        <Route exact path="/" component={Navbar} />
        <Route exact path="/items/" component={Products} />
        <Route exact path="/items/:id" component={Details} />
      </div>
    </BrowserRouter>
    )
  }

}
export default App;