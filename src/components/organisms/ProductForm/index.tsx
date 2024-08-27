import React from "react";
import styles from "./ProductForm.module.scss";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface ProductFormProps {
    onSubmit: (data: { title: string; price: number; description: string; category: string; image: any }) => void;
    product?: {
        title: string;
        description: string;
        price: number;
        image: string;
        category: string;
    };
}

const schema = yup.object().shape({
    title: yup.string().required("The title is required"),
    price: yup.number().required("The price is required").positive("The price must be positive"),
    description: yup.string().required("The description is required"),
    category: yup.string().required("The category is required"),
    image: yup
        .mixed()
        .required('The image is required')
        .test('fileType', 'The file must be an image', (value: any) => {
            return value && value[0] && ['image/jpeg', 'image/png', 'image/gif'].includes(value[0].type);
        }),
});



const ProductForm: React.FC<ProductFormProps> = ({onSubmit, product}) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

return (
    <div className={styles.formContainer}>
        <h1>{product ? 'Edit Product' : 'Create Product'}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputContainer}>
                <label>Title</label>
                <input {...register("title")} placeholder={product ? product.title :"Product Name"} />
                {errors.title && <p className={styles.error}>{errors.title.message}</p>}
            </div>

            <div className={styles.inputContainer}>
                <label>Price</label>
                <input type="number" typeof="number" {...register("price")} placeholder={product ? String(product.price) : "Price"} />
                {errors.price && <p className={styles.error}>{errors.price.message}</p>}
            </div>

            <div className={styles.inputContainer}>
                <label>Description</label>
                <textarea {...register("description")} placeholder={product ? product.description : "Description"} />
                {errors.description && <p className={styles.error}>{errors.description.message}</p>}
            </div>

            <div className={styles.inputContainer}>
                <label>Category</label>
                <input {...register("category")} placeholder={product ? product.category : "category"} />
                {errors.category && <p className={styles.error}>{errors.category.message}</p>}
            </div>

            <div className={styles.fileInput}>
                <label>Product Image</label>
                <input type="file" datatype="images" {...register("image")} />
                {errors.image && <p className={styles.error}>{errors.image.message}</p>}
            </div>

            <button type="submit" className={styles.submitButton}>
                {product ? 'Edit Product' : 'Create Product'}
            </button>
        </form>
    </div>
);
};

export default ProductForm;
