import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsShowingCart } from '../store/slices/isShowingCart.slice';
import { getCartThunk } from '../store/slices/cart.slice';
import { deleteProductInCart, purchaseCartThunk, updateProductInCartThunk } from '../store/slices/cart.slice';
import { setIsCartWithProducts } from '../store/slices/isCartWithProducts.slice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const products = useSelector(state => state.products);
  const isCartWithProducts = useSelector(state => state.isCartWithProducts)

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCartThunk())
  }, [])
  //console.log(cart)

  if(cart.length === 0){
    dispatch(setIsCartWithProducts(false))
  }

  const itemImage = (item) => {
    for(let i in products){
      if(products[i]?.id === item?.id){
        return products[i].images[0].url
      }
    }
  }

  const itemTotal = (item) => {
    const total = (item.quantity * item.product?.price)
    return total
  }

  const productsTotal = () => {
    let sum = 0
    for(let i in cart){
      sum = sum + (cart[i].quantity * cart[i].product.price)
    }
    return sum
  }

  const deleteProduct = (item) => {
    dispatch(deleteProductInCart(item.id))
  }

  const purchaseCart = () => {
    dispatch(purchaseCartThunk())
    dispatch(setIsShowingCart(false))
    navigate('/purchases')
    window.scrollTo(0, 0);
  }

  const updateAddProduct = (item) => {
    const productUpdated = {
      id: item.id,
      newQuantity: {
        "quantity": (item.quantity + 1)
      }
    }

    dispatch(updateProductInCartThunk(productUpdated))
  }

  const updateSubstractProduct = (item) => {
    if(item.quantity > 1){
      const productUpdated = {
        id: item.id,
        newQuantity: {
          "quantity": (item.quantity - 1)
        }
      }

      dispatch(updateProductInCartThunk(productUpdated))
    }
  }

  return (
    <div className='cart-overlay'>
      <div className="cart-overlay-space"></div>
      <div className="cart-container">
        <div className='cart-close-btn'>
          <button onClick={() => dispatch(setIsShowingCart(false))}>
            <i className='bx bx-x bx-sm' ></i>
          </button>
        </div>
        {isCartWithProducts ?
        (
        <div className="cart-data-container">
          <div className="cart-items-container">
            <h2>Shopping cart</h2>
            <ul>
              {cart.map(item => (
                <li key={item.id}>
                  <div className="cart-item-img-description">
                    <div className="cart-item-img">
                      <img src={itemImage(item.product)} alt="" />
                    </div>
                    <div className="cart-item-description">
                      <div className="cart-item-brand-price">
                        <p><b>{item.product.title}</b></p>
                      </div>
                    </div>
                  </div>
                  <div className="pd-line"></div>
                  <div className="cart-item-price">
                    <p>${itemTotal(item)}{item.quantity > 1 && ` x ${item.quantity}`}</p>
                  </div>
                  <div className="cart-item-quantity-options">
                    <div className="cart-item-options">
                      <button onClick={() => updateAddProduct(item)}>+</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateSubstractProduct(item)}>-</button>
                    </div>
                    <div>
                      <button className='cart-item-delete-btn' onClick={() => deleteProduct(item)}>
                        <i className='bx bxs-trash bx-sm'></i>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="cart-total-pay-container">
            <p>Total: ${productsTotal()}</p>
            <button className='cart-checkout-btn' onClick={purchaseCart}>
              <h3>CHECKOUT</h3>
            </button>
          </div>
        </div>
        ) : (
          <div className='cart-empty'>
            <h2>Your cart is empty :{'('}</h2>
            <i className='bx bx-cart bx-lg' ></i>
          </div>
        )
        }
      </div>
    </div>
  );
};

export default Cart;