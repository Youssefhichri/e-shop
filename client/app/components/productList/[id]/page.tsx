"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./one.css";

const One = () => {
  const [product, setProduct] = useState<any>({});
  const [quantity, setQuantity] = useState<number>(1);
  const [mainImage, setMainImage] = useState<string>(""); // state added for main image to be displayed
  const pathname = usePathname();
  const id = pathname.slice(pathname.length - 1);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/api/products/${id}`)
        .then((response) => {
          setProduct(response.data);
          //main image set as the first image in the product images array
          setMainImage(response.data.image);
        })
        .catch((error) => {
          console.log("Error fetching the product:", error);
        });
    }
  }, [id]);

  // added function to handle image click and set the image in the middle to the one clicked on
  const handleImageClick = (image: string) => {
    setMainImage(image);
  }

  const buyNow = () => {
    const order = {
      productId: product.id,
      quantity: quantity,
      // Add other necessary fields
    };

    axios
      .post("http://localhost:8080/api/cart/orders", order, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("Order created successfully:", response.data);
        // Redirect to the orders page or display orders
        router.push('/orders'); // Assuming your orders view is at '/orders'
      })
      .catch((error) => {
        console.log("Error creating order:", error);
      });
  };

  return (
    <div>
      <div className="new-product-page">
        <div className="new-product-container">
          <div className="new-product-images">
            {product.image && (
              <>
                <img
                  src={product.image}
                  alt=""
                  onClick={() => handleImageClick(product.image)}
                />
                <img
                  src={product.image1}
                  alt=""
                  onClick={() => handleImageClick(product.image1)}
                />
                <img
                  src={product.image2}
                  alt=""
                  onClick={() => handleImageClick(product.image2)}
                />
                <img
                  src={product.image3}
                  alt=""
                  onClick={() => handleImageClick(product.image3)}
                />
              </>
            )}
          </div>
          <div className="new-product-main-image">
            <img src={mainImage} alt="Main Product" />
          </div>
          <div className="new-product-details">
            <h1>{product.name}</h1>
            {/* Other product details */}
            <div className="new-product-options">
              {/* Product options */}
              <div className="new-product-colors">
                <label>Colours:</label>
                <button className="new-color-option new-color-red"></button>
                <button className="new-color-option new-color-black"></button>
              </div>
              <div className="new-product-sizes">
                <label>Size:</label>
                <button className="new-size-option">XS</button>
                <button className="new-size-option">S</button>
                <button className="new-size-option">M</button>
                <button className="new-size-option">L</button>
                <button className="new-size-option">XL</button>
              </div>
              <div className="new-product-quantity">
                <label>Quantity:</label>
                <div className="new-quantity-controls">
                  <button
                    className="new-quantity-button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input type="text" value={quantity} readOnly />
                  <button
                    className="new-quantity-button"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <button
              className="new-buy-now-button"
              onClick={buyNow}
            >
              Buy Now
            </button>
            <div className="new-delivery-info">
              <div>
                Free Delivery{" "}
                <span>Enter your postal code for Delivery Availability</span>
              </div>
              <div>
                Return Delivery{" "}
                <span>Free 30 Days Delivery Returns. Details</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>{/* <RelatedItems category={product.category} /> */}</div>
    </div>
  );
};

export default One;
