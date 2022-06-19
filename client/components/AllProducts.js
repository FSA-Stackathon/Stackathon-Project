import React, { Component, createContext } from 'react';
import { connect } from 'react-redux';
import products, { fetchProducts } from '../store/products';
import AllTheProducts from './AllTheProducts';
import AllSkis from './Skis';
import AllSnowboards from './Snowboards';

export const ProductContext = createContext();

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilter: '',
    };
    this.changeFilter = this.changeFilter.bind(this);
  }
  componentDidMount() {
    this.props.getProducts();
  }

  changeFilter(evt) {
    this.setState({
      selectedFilter: evt.target.value,
    });
  }

  render() {
    const { products } = this.props;
    return (
      <ProductContext.Provider value={{ products }}>
        <div id="all-products">
          <h1
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            Welcome to the all products page!
          </h1>
          <h2>Filter The Products</h2>
          <select onChange={this.changeFilter}>
            <option value="All">All</option>
            <option value="Skis">Skis</option>
            <option value="Snowboards">Snowboards</option>
          </select>
          <div id="store-components" className="store-components">
            {this.state.selectedFilter === 'All' ? (
              <AllTheProducts />
            ) : this.state.selectedFilter === 'Skis' ? (
              <AllSkis />
            ) : this.state.selectedFilter === 'Snowboards' ? (
              <AllSnowboards />
            ) : (
              <AllTheProducts />
            )}
          </div>
        </div>
      </ProductContext.Provider>
    );
  }
}

const mapStateToProps = (state) => ({ products: state.products });

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(fetchProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
