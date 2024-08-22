import { useReducer } from 'react';
import './index.css'

const initialState = {
  cart: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      { const itemInCart = state.cart.find((item) => item.id === action.payload.id);
      if (itemInCart) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      } }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case 'INCREASE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case 'DECREASE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    default:
      return state;
  }
};

const ProductPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const products = [
    { id: 1, name: 'Product A', price: 120 },
    { id: 2, name: 'Product B', price: 160 },
    { id: 3, name: 'Product C', price: 220 },
    { id: 4, name: 'Product D', price: 270 },
    { id: 5, name: 'Product E', price: 330 },
    { id: 6, name: 'Product F', price: 400 },
  ];

  const getTotalItems = () => state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const getTotalPrice = () => state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Shop Our Collection</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card product-card h-100">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price: ${product.price}</p>
                <button
                  className="btn btn-dark"
                  onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 cart-summary">
        <h3>Cart Overview</h3>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {state.cart.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>{item.quantity}</td>
                <td>${item.price * item.quantity}</td>
                <td>
                  <button
                    className="btn btn-outline-success btn-sm me-2"
                    onClick={() => dispatch({ type: 'INCREASE_QUANTITY', payload: item })}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-outline-warning btn-sm me-2"
                    onClick={() => dispatch({ type: 'DECREASE_QUANTITY', payload: item })}
                  >
                    -
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item })}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-between">
          <h5>Total Items: {getTotalItems()}</h5>
          <h5>Total Price: ${getTotalPrice()}</h5>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;