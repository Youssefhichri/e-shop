  "use client";
import React, { useEffect, useState } from "react";
import "./Panier.css";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
const Panier = () => {
  const [panier, setPanier] = useState<any>([]);
  const [total, setTotal] = useState<any>(0);
  const [refre, setRefre] = useState<any>(false);
  const { buyer } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log(buyer.id);
    axios
      .get(`http://localhost:8080/api/panier/usercart/${buyer.id}`)
      .then((res) => {
        console.log(res.data, "panier");

        setPanier(res.data[0].Products);
        const sum = res.data[0].Products.reduce((acc, product) => {
          const productTotal = product.price * (product.quantity || 1);
          return acc + productTotal;
        }, 0);
        setTotal(sum);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [ buyer.id,refre]);
  const handleQuantityChange = (index, newQuantity) => {
    const updatedProducts = [...panier];
    updatedProducts[index].quantity = newQuantity;

    const newTotal = updatedProducts.reduce((acc, product) => {
      const productTotal = product.price * (product.quantity || 1);
      return acc + productTotal;
    }, 0);

    setPanier(updatedProducts);
    setTotal(newTotal);
  };
  const remove = (productId) => {
    axios
      .delete(`http://localhost:8080/api/panier/del/${productId}`)
      .then((response) => {
        console.log(response);
        setRefre(!refre);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <div className="panier-container">
        <div className="breadcrumb">
          {/* <span>Home</span> / <span>Cart</span> */}
        </div>
        <h2>Cart</h2>
        <table className="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {panier.map((el, index) => (
              <tr key={el.id}>
                <td>
                  <img src={el.image} alt={el.name} className="product-image" />
                  {el.name}
                </td>
                <td>${el.price}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={el.quantity || 1}
                    onChange={(e) =>
                      handleQuantityChange(index, parseInt(e.target.value))
                    }
                    className="quantity-input"
                  />
                </td>
                <td>${el.price * (el.quantity || 1)}</td>
                <td
                  onClick={() => {
                    remove(el.id);
                  }}
                >
                  X
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="return-button" onClick={() => router.push("/")}>
          Return To Shop
        </button>
        <div className="coupon-container">
          <input
            type="text"
            placeholder="Coupon Code"
            className="coupon-input"
          />
          <button className="apply-coupon">Apply Coupon</button>
        </div>
        <div className="cart-total">
          <h3>Cart Total</h3>
          <p>Subtotal: ${total}</p>
          <p>Shipping: Free</p>
          <p>Total: ${total}</p>
          <button className="checkout-button">Proceed to checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Panier;
