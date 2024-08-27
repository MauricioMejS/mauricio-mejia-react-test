import React, { use, useEffect, useState } from "react";
import ProductTemplate from "@/components/templates/ProductTemplate";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct } from "@/store/productSlice";
import { FieldValues, set, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import store, { RootState } from "@/store";
import useLocalStorage from "@/hooks/useLocalStorage";
import Loader from "@/components/atoms/Loader";
import Swal from 'sweetalert2'

const Login = () => {
  const router = useRouter();
  const [productType, setProductType] = useState("");
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const products = useSelector((state: RootState) => state.products.products);
  const { sessionData, verifySession } = useLocalStorage("mySecretKey");
  const dispatch = useDispatch();
  const { id } = router.query;

  console.log("Product:", router.pathname);
  const onSubmit = (data: any) => {
    const newProduct = {
      id: parseInt(id as string),
      title: data.title,
      price: data.price,
      description: data.description,
      image: URL.createObjectURL(data.image[0]),
      category: data.category,
    };

    dispatch(addProduct(newProduct));
    dispatch(deleteProduct(parseInt(id as string)));

    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("Producto creado:", json);
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Product edited successfully",
            showConfirmButton: false,
            timer: 1500
          });
        router.push("/products");
      });
  };

  useEffect(() => {
    if (!verifySession("mySecretKey")) {
      router.push("/login");
    } else {
      if (router.pathname === "/products/create") {
        setProductType("new");
        setProduct(null);
      } else {
        setProductType("edit");
        setProduct(
          products.find((product) => product.id === parseInt(id as string))
        );
        console.log("Product:", product);
        setLoading(false);
      }
    }
  }, []);

  return (
    <div>
      {loading && <Loader />}
      {!loading && <ProductTemplate onSubmit={onSubmit} product={product} />}
    </div>
  );
};
export default Login;
