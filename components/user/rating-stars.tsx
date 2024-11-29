"use client";
import { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating, size }: { rating: number, size?: number }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const roundedRating = Math.round(rating * 2) / 2;

  const fullStarsCount = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;

  const stars = Array.from({ length: 5 }, (_, index) => {
    if (index < fullStarsCount) {
      if (size) {
        return <FaStar size={size} key={index} />;
      } else {
      return <FaStar size={18} key={index} />;
      }
    } else if (index === fullStarsCount && hasHalfStar) {
      if(size) {
        return <FaStarHalfAlt size={size} key="half-star" />;
      } else {
      return <FaStarHalfAlt size={18} key="half-star" />;
      }
    } else {
      if(size) {
        return <FaRegStar size={size} key={`empty-${index}`} />;
      }
      else  {
      return <FaRegStar size={18} key={`empty-${index}`} />;
      }
    }
  });

  return (
    <div className="flex">
      {stars.map((star, index) => (
        <span className="mx-[2px] " key={index}>
          {star}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
