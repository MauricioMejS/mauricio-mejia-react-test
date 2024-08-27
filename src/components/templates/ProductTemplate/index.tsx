import React from "react";
import ProductForm from "@/components/organisms/ProductForm";
import Background from "@/components/organisms/Background";
import styles from "./ProductTemplate.module.scss";
import { on } from "events";

interface ProductTemplateProps {
    onSubmit: (data: {
        title: string;
        description: string;
        price: number;
        image: string;
    }) => void;
    product?: {
        title: string;
        description: string;
        price: number;
        image: string;
        rating: {
            rate: number;
            count: number;
        } | null;
        category: string;
    };
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({onSubmit, product}) => {
  return (
    <>
      <Background />
      <div className={styles.productTemplate}>
        <div className={styles.productTemplateContent}>
          <ProductForm onSubmit={onSubmit} product={product}/>
        </div>
      </div>
    </>
  );
};

export default ProductTemplate;
