import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from './AllProducts';
import ProductOrdering from './ProductOrdering';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function AllSnowboards(props) {
  const { products } = useContext(ProductContext);
  const [sortedProducts, setSortedProducts] = useState([]);

  const finalProds = sortedProducts.length > 0 ? sortedProducts : products;

  return (
    <Container>
      <ProductOrdering
        setSortedProducts={setSortedProducts}
        products={products}
      />
      <CardGroup>
        {finalProds
          .filter((product) => product.id && product.type === 'snowboard')
          .map((product) => (
            <Col key={product.id}>
              <Card
                className='mb-2'
                style={{ width: '30rem', height: '30rem' }}
              >
                <Card.Img
                  variant='top'
                  style={{ height: '250px' }}
                  src={product.image_url}
                />
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                <Link to={`/products/${product.id}`}>
                  <Button
                    className='mt-auto'
                    style={{
                      width: '30rem',
                      position: 'absolute',
                      bottom: 0,
                    }}
                  >
                    View Product
                  </Button>
                </Link>
              </Card>
            </Col>
          ))}
      </CardGroup>
    </Container>
  );
}
