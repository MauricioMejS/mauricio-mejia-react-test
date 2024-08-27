import React from "react";
import RatingStars from "@/components/molecules/RatingStars";
import styles from "./ProductDetail.module.scss";

interface ProductDetailProps {
  product: any;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.productImage}
        />
      </div>
      <div className={styles.detailsContainer}>
        <h1 className={styles.title}>{product.title}</h1>
        {product.rating && (
          <div className={styles.ratingPrice}>
            <RatingStars
              rating={product.rating.rate}
              count={product.rating.count}
            />
            <p className={styles.price}>${product.price}</p>
          </div>
        )}
        <p className={styles.price}>${product.price}</p>
        <p className={styles.description}>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
