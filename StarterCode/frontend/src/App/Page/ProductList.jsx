import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProducts(products.filter(product => product.id !== id));
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '1200px', width: '100%' }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          List of Product Cards
        </Typography>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          {products.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ margin: '8px', padding: '8px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.imageUrl}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="primary">
                    {product.description}
                  </Typography>
                  <Typography variant="body2" color="primary">
                    ${product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(product.id)}
                    sx={{ marginTop: '16px' }}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default ProductList;



// import React, { useState, useEffect } from 'react';
// import './App.css'; 

// const ProductList = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     // Fetch products from the backend
//     fetch('http://localhost:5000/api/products')
//       .then(response => response.json())
//       .then(data => setProducts(data))
//       .catch(error => console.error('Error fetching products:', error));
//   }, []);

//   const handleDelete = (id) => {
//     fetch(`http://localhost:5000/api/products/${id}`, {
//       method: 'DELETE',
//     })
//       .then(response => {
//         if (response.ok) {
//           setProducts(products.filter(product => product.id !== id));
//         } else {
//           console.error('Failed to delete product');
//         }
//       })
//       .catch(error => console.error('Error deleting product:', error));
//   };

//   return (
//     <div className="App">
//       <h1>List of Products</h1>
//       <div className="products-list">
//         {products.map(product => (
//           <div key={product.id} className="product-card">
//             <img src={product.imageUrl} alt={product.name} />
//             <h2>{product.name}</h2>
//             <p>{product.description}</p>
//             <p>${product.price}</p>
//             <button onClick={() => handleDelete(product.id)}>Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductList;