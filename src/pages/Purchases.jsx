import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';
import { getProductsThunk } from '../store/slices/products.slice';
import { useNavigate } from 'react-router-dom';
import { setIsPurchases } from '../store/slices/isPurchases';

const Purchases = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const purchases = useSelector(state => state.purchases);
  const isPurchases = useSelector(state => state.isPurchases);
  const products = useSelector(state => state.products);

  useEffect(() => {
    dispatch(getPurchasesThunk());
    dispatch(getProductsThunk());
    window.scrollTo(0, 0);
  }, []);

  if (purchases.length === 0) {
    dispatch(setIsPurchases(false));
  } else if (purchases.length > 0) {
    dispatch(setIsPurchases(true));
  }

  //console.log(purchases)
  //console.log(products)

  const purchaseDate = (time) => {
    return new Date(time).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const productImg = (purchase) => {
    for(let i in products){
      if(products[i].id === purchase.product?.id){
        return products[i].images[0].url
      }
    }
  }

  const productTotal = (purchase) => {
    const total = (purchase.quantity * purchase.product?.price)
    return total
  }

  const productsTotal = (purchase) => {
    /*
    let sum = 0
    for(let i in purchase){
      sum = sum + (purchase.product[i].price * purchase.quantity)
    }
    return sum
    */
    const total = (purchase.quantity * purchase.product?.price)
    return total
  }

  const purchasedInTotal = () => {
    let sum = 0
    for(let i in purchases){
        sum = sum + (purchases[i].product?.price * purchases[i].quantity)
    }
    return sum
  }

  return (
    <div className='purchases-view-container'>
      <div className="pch-ul-container">
        <h2 data-aos="fade-up">Purchase history</h2>
        <ul className='pch-ul'>
          {purchases.map(purchase => (
            <li key={purchase.id} className='pch-container' data-aos="fade-up">
              <div className="pch-date-container">
                <p>{purchaseDate(purchase.createdAt)}</p>
              </div>
              <div className="pd-line"></div>
              <div className="pch-products-container">
                <ul className='pch-ul-products'>
                  {             
                      <li className='pch-product-container' key={purchase.id}>
                        <div className="pch-pd-img-title-price">
                          <div className="pch-pd-img">
                            <img src={productImg(purchase)} alt="" />
                          </div>
                          <div className="pch-pd-title-price">
                            <p>{purchase.product?.title}</p>
                            <p style={{fontSize: '0.8rem', color: 'gray'}}>${purchase.product?.price}</p>
                          </div>
                        </div>
                        <div className="pch-pd-description">
                          <p>${productTotal(purchase)}</p>
                          <p>{purchase.quantity}</p>
                        </div>
                        <div className="pd-line"></div>
                      </li>
                  }
                </ul>
              </div>
              <div className="pch-total-container">
                <p><b>Total</b>: ${productsTotal(purchase)}</p>
              </div>
            </li>
          )).reverse()}
        </ul>
      </div>
      <div className="pch-total-pchs-container">
        {isPurchases ?
          (
            <div data-aos="fade-up">
              <p><b>TOTAL PURCHASED</b>: ${purchasedInTotal()}</p>
            </div>
          ) : (
            <div className="pch-total-pchs-container__no-purchase">
            <p><b>YOU HAVE NOT PURCHASED YET</b></p>
            <button onClick={() => navigate('/')}>
              SEE PRODUCTS
              <div className="line-bar"></div>  
            </button>
          </div>
          )
        }
      </div>
    </div>
  );
};

export default Purchases;