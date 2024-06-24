import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useBuy } from "@/hooks/use-buy";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from 'next/router';
import LinePay00 from "@/components/Carts/payment";
function Cart() {
  const { product, productTotal ,removeProductHandler} = useBuy();
  const [cart, setCart] = useState(product);
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const { auth } = useAuth();
  const { clearBuyStorm } = useBuy();
  const handleClearCart = () => {
    clearBuyStorm();
    window.location.reload();
  }
  

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {product.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is currently empty</p>
          <div className="start-shopping">
            <Link href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">商品</h3>
            <h3 className="price">價錢</h3>
            <h3 className="quantity">數量</h3>
            <h3 className="total">總數</h3>
          </div>
          <div className="cart-items">
            {product &&
              product.map((cartItem) => (
                <div className="cart-item" key={cartItem.id}>
                  <div className="cart-product">
                    <img src={cartItem.img} alt={cartItem.name} />
                    <div>
                      <h3>{cartItem.name}</h3>
                      <p>{cartItem.desc}</p>
                      <button className='btnsmall' onClick={() => removeProductHandler(cartItem.id)}>
                        移除
                      </button>
                    </div>
                  </div>
                  <div className="cart-product-price">${cartItem.price}</div>
                  <div className="count">{cartItem.add}</div>
                  <div className="cart-product-total-price">
                    ${cartItem.price * cartItem.add}
                  </div>
                </div>
              ))}

          </div>
          <p style={{ textAlign: "end" }}>Taxes and shipping calculated at checkout</p>

          <div className="cart-summary">
            <button className="clear-btn" onClick={() => handleClearCart()}>
              清除全部
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>總數</span>
                <span className="amount" >${productTotal}</span>
              </div>
              <LinePay00 count={productTotal} />


            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart