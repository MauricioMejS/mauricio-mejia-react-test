import React from 'react';
import styles from './ProductCard.module.scss';

type ProductCardProps = {
  name: string;
  price: number;
  image: string;
};

const ProductCard: React.FC<ProductCardProps> = ({ name, price, image }) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
      <h2 className={styles.name}>{name}</h2>
      <p className={styles.price}>${price.toFixed(2)}</p>
    </div>
  );
};

export default ProductCard;