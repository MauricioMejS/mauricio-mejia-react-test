import React, { use, useEffect } from "react";
import ProductTemplate from "@/components/templates/ProductTemplate";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "@/store/productSlice";
import { FieldValues, SubmitHandler } from "react-hook-form";
import router, { useRouter } from "next/router";
import store, { RootState } from "@/store";
import useLocalStorage from "@/hooks/useLocalStorage";
import Swal from "sweetalert2";

const Login = () => {
  const Swal = require("sweetalert2");
  const route = useRouter();
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();
  const { sessionData, verifySession } = useLocalStorage("mySecretKey");
  const [loading, setLoading] = React.useState(true);
  const onSubmit = (data: any) => {
    const newProduct = {
      id: products.length + 1,
      title: data.title,
      price: data.price,
      description: data.description,
      image: URL.createObjectURL(data.image[0]),
      category: data.category,
    };

    dispatch(addProduct(newProduct));

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
            title: "Product created successfully",
            showConfirmButton: false,
            timer: 1500
          });
        route.push("/products");
      });
  };

  useEffect(() => {
    if (!verifySession("mySecretKey")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <ProductTemplate onSubmit={onSubmit} />
    </div>
  );
};

export default Login;
