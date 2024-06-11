import React, { useState, useEffect } from "react";
import axios from "axios";

interface RatingProps {
  itemId: number;
}

const Rating: React.FC<RatingProps> = ({ itemId }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        console.log(itemId);
        const { data } = await axios.get(
          `http://localhost:8080/api/stars/rating/${itemId}`
        );

        setAverageRating(data.averageRating);
      } catch (error) {
        console.error("Error fetching average rating:", error);
      }
    };

    fetchAverageRating();
  }, [itemId]);

  const submitRating = async (rating: number) => {
    try {
      await axios.post("http://localhost:8080/api/stars/rate", {
        itemId,
        rating,
      });
      setRating(rating);
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <div>
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || rating) ? "on" : "off"}
              onClick={() => submitRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
      <p>Average Rating: {averageRating.toFixed(1)}</p>
    </div>
  );
};

export default Rating;
