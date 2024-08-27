import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ProductDetail from "@/components/organisms/ProductDetail";
import Loader from "@/components/atoms/Loader";
import useSession from "@/hooks/useLocalStorage";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const ProductId = () => {
  const [product, setProduct] = useState<any>(null);
  const products = useSelector((state: RootState) => state.products.products);
  const { sessionData, verifySession } = useSession("mySecretKey");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const product = products.find(
        (product) => product.id === parseInt(id as string)
      );
      setProduct(product);
    }
  }, [id]);

  useEffect(() => {
    if (!verifySession("mySecretKey")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  if (!product || loading)
    return (
      <>
        <Loader />
      </>
    );

  return <>{product && <ProductDetail product={product} />}</>;
};

export default ProductId;
