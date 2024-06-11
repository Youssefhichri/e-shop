"use client";

import React, { useState, useEffect } from "react";
import "./flash.css";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Rating from "../rating/Rating";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Carousel from "react-multi-carousel"; // adding multi carousel for browsing through multiple products
import "react-multi-carousel/lib/styles.css";

const FlashSales = () => {
  const router = useRouter();
  const { buyer } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:8080/api/products/getAll");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await res.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    console.log("User role:", buyer.role);
  }, [buyer]);

  const addToPanier = (id: number) => {
    const data = {
      BuyerId: buyer.id,
      ProductId: id,
    };

    axios
      .post("http://localhost:8080/api/panier/usercart", data)
      .then((res) => {
        console.log("Added to cart", res);
        toast.success("Added to Cart Successfully!");
      })
      .catch((err) => {
        console.error("Post error", err);
        toast.error("Failed to add to cart.");
      });
  };

  const addToFavorites = (id: number) => {
    const data = {
      BuyerId: buyer.id,
      ProductId: id,
    };

    axios
      .post("http://localhost:8080/api/wishList/userWishList", data)
      .then((res) => {
        console.log("Added to favorites", res);
        toast.success("Added to Favorites Successfully!");
      })
      .catch((err) => {
        console.error("Post error", err);
        toast.error("Failed to add to favorites.");
      });
  };

  const handleImageClick = (id: number) => {
    router.push(`/components/productList/${id}`);
  };

  const responsive = {
   desktop: {
      breakpoint: { max: 1920, min: 1024 }, 
      items: 4, // since we want 4 items to be displayed as default
    }
  };

  return (
    <div>
      <h1 className="top-prod">Top Products</h1>
      <div
        className="top-label2"
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src="https://www.clker.com/cliparts/3/R/3/7/W/R/orange-vertical-rectangle-md.png"
          alt="IPS LCD Gaming Monitor"
          style={{ width: "20px", height: "auto", marginRight: "10px" }}
        />
        <h2 className="top-subtitle">This Month</h2>
      </div>
      <Carousel responsive={responsive}>
        {/* Below we wrap our products in the carousel */}
        {data.map((el: any) => (
          <div className="products" key={el.id}>
            <div className="product">
              <img
                onClick={() => handleImageClick(el.id)}
                src={el.image}
                alt={el.name}
              />
              <h3>{el.name}</h3>
              <Rating itemId={el.id} />
              {buyer.role === "buyer" && (
                <>
                  <button
                    onClick={() => addToPanier(el.id)}
                    disabled={addToPanier[el.id]}
                  >
                    {addToPanier[el.id] ? "Added to Cart" : "Add To Cart"}
                  </button>
                  <span
                    className="icon-heart2"
                    onClick={() => addToFavorites(el.id)}
                  >
                    ❤️
                  </span>
                </>
              )}
              <p className="price-color">
                <span>${el.price}</span>
              </p>
            </div>
          </div>
        ))}
      </Carousel>
      <ToastContainer />
    </div>
  );
};

export default FlashSales;
