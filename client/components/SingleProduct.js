import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProduct, addToCart } from '../store/singleProduct';
import { fetchCart } from '../store/cart';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = { cartItems: 0 };
  }

  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.cartItems !== this.state.cartItems) {
      console.log('in component did update')
      this.props.getCart(this.props.user.id);
    }
  }

  render() {
    const { product, addItemToCart, user } = this.props;
    return (
      <Container>
        <h1
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#808080',
          }}
        >
          Welcome to the single product page!
        </h1 >
        <h3 style={{ color: '#808080' }}>Product Details</h3>
        <CardGroup>
          <Col>
            <Card className='mb-2' style={{ width: '30rem', height: '30rem' }}>
              <Card.Img
                variant='top'
                style={{ height: '250px' }}
                src={product.image_url}
              />
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>${product.price}</Card.Text>
              <Card.Text>{product.type}</Card.Text>
              <Card.Text>{product.inventory}</Card.Text>
              <Button
                className='mt-auto'
                onClick={async() => {
                  this.setState({ cartItems: this.state.cartItems + 1})
                  addItemToCart(product.id, user.id)
                }}
              >
                Add to Cart
              </Button>
            </Card>
          </Col>
        </CardGroup>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.product,
  user: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  getProduct: (id) => dispatch(fetchProduct(id)),
  addItemToCart: (productId, userId) => dispatch(addToCart(productId, userId)),
  getCart: (userId) => dispatch(fetchCart(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
