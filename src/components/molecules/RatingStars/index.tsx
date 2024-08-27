import React from 'react';
import styles from './RatingStars.module.scss';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  count?: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating, maxRating = 5, count }) => {
  const stars = Array.from({ length: maxRating }, (_, index) => index + 1);

  return (
    <div className={styles.stars}>
      {stars.map((star) => (
        <span
          key={star}
          className={`${styles.star} ${rating >= star ? styles.filled : ''}`}
          aria-label={`Star ${star}`}
        >
          ★
        </span>
      ))}
      <p className={styles.description}>
        {rating} ({count})
        </p>
    </div>
  );
};

export default RatingStars;