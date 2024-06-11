import React from "react";
import "./FeaturedProducts.css";
const FeaturedProducts = () => {
  return (
    <div className="featured-container">
      <div className="featured-header">
        <span className="featured-tag">Featured</span>
      </div>
      <h2>New Arrival</h2>
      <div className="featured-grid">
        <div className="featured-item large">
          <img
            src="https://www.flamingtoast.com/wp-content/uploads/2020/11/ps5_pl-greena.jpg"
            alt="PlayStation 5"
          />
          <div className="featured-text">
            <h3>PlayStation 5</h3>
            <p>Black and White version of the PS5 coming out on sale.</p>
            <a href="#">Shop Now</a>
          </div>
        </div>
      


        <div className="featured-item medium">
          <img
            src="https://static.vecteezy.com/system/resources/previews/002/102/423/non_2x/black-gold-leather-upholstery-background-for-cosmetic-product-with-3d-packaging-free-vector.jpg"
            alt="Women's Collections"
          />
          <div className="featured-text">
            <h3>Women's Collections</h3>
            <p>Featured woman collections that give you another vibe.</p>
            <a href="#">Shop Now</a>
          </div>
        </div>
        <div className="featured-item small">
          <img
            src="https://static.standard.co.uk/s3fs-public/thumbnails/image/2016/10/13/16/amazon-echo-box.jpg?width=1200&height=900&fit=crop"
            alt="Speakers"
          />
          <div className="featured-text">
            <h3>Speakers</h3>
            <p>Amazon wireless speakers</p>
            <a href="#">Shop Now</a>
          </div>
        </div>
        <div className="featured-item small">
          <img
            src="https://img.freepik.com/premium-photo/neon-blue-light-wireless-headphones-pictures-black-background-ai-generated-art_848903-5915.jpg"
            alt="Perfume"
          />
          <div className="featured-text">
            <h3>Headphones</h3>
            <p>GUCCI INTENSE OUD EDP</p>
            <a href="#">Shop Now</a>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default FeaturedProducts;
